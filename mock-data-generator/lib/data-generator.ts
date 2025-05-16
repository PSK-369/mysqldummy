import type { Field, GeneratorConfig, ColumnType } from "@/types"
import { faker } from "@faker-js/faker"

// Helper function to apply case formatting
const applyCase = (value: string, caseOption?: string): string => {
  if (!caseOption || caseOption === "none") return value

  switch (caseOption) {
    case "lower":
      return value.toLowerCase()
    case "upper":
      return value.toUpperCase()
    case "title":
      return value
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
    case "sentence":
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    default:
      return value
  }
}

// Helper function to apply prefix and suffix
const applyPrefixSuffix = (value: any, prefix?: string, suffix?: string): string => {
  let result = String(value)
  if (prefix) result = prefix + result
  if (suffix) result = result + suffix
  return result
}

// Helper function to generate a value based on column type
const generateTypedValue = (
  columnType: ColumnType,
  options: {
    pattern?: string
    customValues?: string[]
    minValue?: number
    maxValue?: number
    precision?: number
    nullPercentage?: number
    uniqueValues?: boolean
    prefix?: string
    suffix?: string
    caseOption?: string
  } = {},
): any => {
  const {
    pattern,
    customValues,
    minValue = 0,
    maxValue = 1000,
    precision = 2,
    nullPercentage = 0,
    prefix,
    suffix,
    caseOption,
  } = options

  // Handle NULL values based on nullPercentage
  if (nullPercentage > 0 && Math.random() * 100 < nullPercentage) {
    return null
  }

  // If custom values are provided, use them
  if (customValues && customValues.length > 0) {
    const value = customValues[Math.floor(Math.random() * customValues.length)]
    return applyPrefixSuffix(applyCase(value, caseOption), prefix, suffix)
  }

  // If pattern is provided, use it
  if (pattern) {
    const value = faker.helpers.fromRegExp(pattern)
    return applyPrefixSuffix(applyCase(value, caseOption), prefix, suffix)
  }

  // Generate based on column type
  let value: any

  switch (columnType) {
    case "integer":
      value = faker.number.int({ min: minValue, max: maxValue })
      break
    case "float":
      value = faker.number.float({ min: minValue, max: maxValue, precision: Math.pow(0.1, precision) })
      break
    case "double":
      value = faker.number.float({ min: minValue, max: maxValue, precision: Math.pow(0.1, precision) })
      break
    case "boolean":
      value = faker.datatype.boolean()
      break
    case "text":
      value = faker.lorem.paragraph()
      break
    case "date":
      value = faker.date.past().toISOString().split("T")[0]
      break
    case "time":
      value = faker.date.anytime().toISOString().split("T")[1].split(".")[0]
      break
    case "datetime":
      value = faker.date.past().toISOString()
      break
    default: // string
      value = faker.lorem.word()
  }

  // Apply prefix/suffix for non-boolean types
  if (columnType !== "boolean") {
    return applyPrefixSuffix(columnType === "string" ? applyCase(String(value), caseOption) : value, prefix, suffix)
  }

  return value
}

// Update the generateValue function to handle sequential vs random number generation for integer/float/double
const generateValue = (field: Field, index: number, config: GeneratorConfig): any => {
  const { type, format, customName, columnType, customPattern, customValues } = field

  // Handle ID field with configurable digits and prefix/suffix
  if (type === "id") {
    if (format === "uuid") {
      return faker.string.uuid()
    } else {
      let id = String(index + 1).padStart(config.idDigits || 5, "0")
      if (config.idPrefix) id = config.idPrefix + id
      if (config.idSuffix) id = id + config.idSuffix
      return id
    }
  }

  // Handle integer, float, and double with sequential or random generation
  if (columnType === "integer" || columnType === "float" || columnType === "double") {
    const minValue = field.minValue !== undefined ? field.minValue : 0
    const maxValue = field.maxValue !== undefined ? field.maxValue : 1000
    const precision = field.precision !== undefined ? field.precision : 2
    const generationType = field.generationType || "random"

    // Handle sequential generation
    if (generationType === "sequential") {
      if (columnType === "integer") {
        return minValue + index
      } else {
        // For float/double, increment by 1.0 but keep decimal places
        const value = minValue + index
        // Use toFixed to apply precision and then convert back to number
        return Number(value.toFixed(precision))
      }
    }

    // Handle random generation
    if (columnType === "integer") {
      return faker.number.int({ min: minValue, max: maxValue })
    } else {
      // For float/double, generate a random number and then apply precision
      const randomValue = faker.number.float({
        min: minValue,
        max: maxValue,
        precision: Math.pow(0.1, precision),
      })
      // Ensure the precision is applied correctly by using toFixed
      return Number(randomValue.toFixed(precision))
    }
  }

  // Handle custom data type
  if (type === "custom") {
    // First check if the field has its own custom values or pattern
    if (customValues && customValues.length > 0) {
      const value = customValues[Math.floor(Math.random() * customValues.length)]
      return formatValueByType(value, columnType || "string", field.precision)
    }

    if (customPattern) {
      const value = faker.helpers.fromRegExp(customPattern)
      return formatValueByType(value, columnType || "string", field.precision)
    }

    // Find matching custom data type from config
    const customType = config.customDataTypes.find((dt) => dt.name === customName)
    if (customType) {
      // Use the custom type's configuration to generate a value
      return generateTypedValue(customType.columnType || "string", {
        pattern: customType.pattern,
        customValues: customType.values,
        minValue: (customType as any).minValue,
        maxValue: (customType as any).maxValue,
        precision: (customType as any).precision,
        nullPercentage: (customType as any).nullPercentage,
        uniqueValues: (customType as any).uniqueValues,
        prefix: (customType as any).prefix,
        suffix: (customType as any).suffix,
        caseOption: (customType as any).caseOption,
      })
    }

    // Fallback
    return formatValueByType(customName || "Custom Value", columnType || "string", field.precision)
  }

  // Handle standard data types
  let value: any

  switch (type) {
    case "fullName":
      value = faker.person.fullName()
      break
    case "firstName":
      value = faker.person.firstName()
      break
    case "lastName":
      value = faker.person.lastName()
      break
    case "email":
      value = faker.internet.email()
      break
    case "phone":
      value = faker.string.numeric(10)
      break
    case "address":
      value = faker.location.streetAddress()
      break
    case "city":
      value = faker.location.city()
      break
    case "state":
      value = faker.location.state()
      break
    case "zipCode":
      value = faker.location.zipCode()
      break
    case "country":
      value = faker.location.country()
      break
    case "company":
      value = faker.company.name()
      break
    case "jobTitle":
      value = faker.person.jobTitle()
      break
    case "department":
      const departments = [
        "Engineering",
        "Marketing",
        "Sales",
        "Finance",
        "HR",
        "Operations",
        "Customer Support",
        "Research",
        "Legal",
        "Product",
        "Design",
        "Quality Assurance",
      ]
      value = departments[Math.floor(Math.random() * departments.length)]
      break
    case "gender":
      value = faker.person.gender()
      break
    case "date":
      value = faker.date.past().toISOString().split("T")[0]
      break
    case "time":
      value = faker.date.anytime().toISOString().split("T")[1].split(".")[0]
      break
    case "color":
      const colors = [
        "Red",
        "Blue",
        "Green",
        "Yellow",
        "Purple",
        "Orange",
        "Pink",
        "Brown",
        "Black",
        "White",
        "Gray",
        "Teal",
        "Cyan",
        "Magenta",
        "Lime",
      ]
      value = colors[Math.floor(Math.random() * colors.length)]
      break
    case "url":
      value = faker.internet.url()
      break
    case "integer":
      value = faker.number.int({ min: 0, max: 1000 })
      break
    case "float":
      value = faker.number.float({ min: 0, max: 1000, precision: 0.01 })
      break
    case "boolean":
      value = faker.datatype.boolean()
      break
    default:
      value = ""
  }

  // Format the value based on the column type
  return formatValueByType(value, columnType || "string", field.precision)
}

// Update the formatValueByType function for proper formatting
const formatValueByType = (value: any, columnType: ColumnType, precision?: number): any => {
  switch (columnType) {
    case "integer":
      return typeof value === "number" ? Math.floor(value) : Number.parseInt(String(value), 10) || 0
    case "float":
    case "double":
      const numValue = typeof value === "number" ? value : Number.parseFloat(String(value)) || 0.0
      // Apply precision if provided
      return precision !== undefined ? Number(numValue.toFixed(precision)) : numValue
    case "boolean":
      if (typeof value === "boolean") return value
      if (typeof value === "string") {
        const lowered = value.toLowerCase()
        return lowered === "true" || lowered === "yes" || lowered === "1"
      }
      return Boolean(value)
    default: // string
      return String(value)
  }
}

const formatValueForOutput = (value: any, columnType: ColumnType | undefined, format: string): string => {
  if (value === null || value === undefined) {
    return "NULL"
  }

  if (columnType === "integer" || columnType === "float" || columnType === "double") {
    return String(value)
  }

  if (columnType === "boolean") {
    return value ? "true" : "false"
  }

  // For strings and text, escape and quote
  return `"${String(value).replace(/"/g, '\\"')}"`
}

export const generateData = (config: GeneratorConfig): string => {
  const { rows, format, fields, tableName } = config
  const data = []

  for (let i = 0; i < rows; i++) {
    const row: Record<string, any> = {}
    for (const field of fields) {
      const value = generateValue(field, i, config)
      row[field.name] = value
    }
    data.push(row)
  }

  switch (format) {
    case "json":
      return JSON.stringify(data, null, 2)
    case "csv": {
      const headers = fields.map((field) => field.name).join(",")
      const rows = data
        .map((row) =>
          fields
            .map((field) => {
              const value = row[field.name]
              return typeof value === "string" ? `"${value.replace(/"/g, '""')}"` : value
            })
            .join(","),
        )
        .join("\n")
      return `${headers}\n${rows}`
    }
    case "sql": {
      const fieldNames = fields.map((field) => `\`${field.name}\``).join(", ")
      const insertStatements = data
        .map((row) => {
          const values = fields
            .map((field) => {
              const value = row[field.name]
              return formatValueForOutput(value, field.columnType, format)
            })
            .join(", ")
          return `INSERT INTO \`${tableName}\` (${fieldNames}) VALUES (${values});`
        })
        .join("\n")

      // Update the SQL generation to match the simplified column types
      const createTable =
        `CREATE TABLE IF NOT EXISTS \`${tableName}\` (\n` +
        fields
          .map((field) => {
            let dataType = "VARCHAR(255)"

            if (field.columnType === "integer") dataType = "INT"
            if (field.columnType === "float") dataType = "FLOAT"
            if (field.columnType === "double") dataType = "DOUBLE"
            if (field.columnType === "boolean") dataType = "BOOLEAN"

            return `  \`${field.name}\` ${dataType}`
          })
          .join(",\n") +
        "\n);\n\n"

      return createTable + insertStatements
    }
    case "html": {
      const headers = fields.map((field) => `<th>${field.name}</th>`).join("")
      const rows = data
        .map((row) => {
          const cells = fields.map((field) => `<td>${row[field.name]}</td>`).join("")
          return `<tr>${cells}</tr>`
        })
        .join("\n")

      return `<!DOCTYPE html>
<html>
<head>
  <title>${tableName} Data</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
    tr:nth-child(even) { background-color: #f9f9f9; }
  </style>
</head>
<body>
  <h1>${tableName} Data</h1>
  <table>
    <thead>
      <tr>${headers}</tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>`
    }
    default:
      return JSON.stringify(data, null, 2)
  }
}
