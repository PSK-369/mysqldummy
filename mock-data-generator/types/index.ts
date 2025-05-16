export type DataType =
  | "fullName"
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "address"
  | "city"
  | "state"
  | "zipCode"
  | "country"
  | "company"
  | "jobTitle"
  | "department"
  | "gender"
  | "date"
  | "time"
  | "color"
  | "url"
  | "id"
  | "integer"
  | "float"
  | "boolean"
  | "custom"

// Update the ColumnType to remove date, time, datetime, and text
export type ColumnType = "string" | "integer" | "float" | "double" | "boolean"

// Update the Field interface to include new number configuration properties
export interface Field {
  id: string
  name: string
  type: DataType
  format?: string
  columnType?: ColumnType
  customName?: string
  customPattern?: string
  customValues?: string[]
  prefix?: string
  suffix?: string
  nullPercentage?: number
  uniqueValues?: boolean
  caseOption?: string
  minValue?: number
  maxValue?: number
  precision?: number
  // New properties
  digits?: number
  generationType?: "sequential" | "random"
}

export type OutputFormat = "json" | "csv" | "sql" | "xlsx"

export interface CustomDataType {
  name: string
  values: string[]
}

// Update the GeneratorConfig interface to include ID configuration
export interface GeneratorConfig {
  rows: number
  format: OutputFormat
  fields: Field[]
  tableName: string
  idDigits?: number
  idPrefix?: string
  idSuffix?: string
  customDataTypes: CustomDataType[]
  templates?: SchemaTemplate[]
}

export interface SchemaTemplate {
  id: string
  name: string
  description: string
  fields: Field[]
}

export interface SettingsConfig {
  darkMode: boolean
  fontSize: number
  showLineNumbers: boolean
  compactMode: boolean
  defaultFormat: OutputFormat
  defaultRows: number
}
