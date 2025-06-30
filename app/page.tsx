"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Plus,
  Download,
  Eye,
  Trash2,
  Copy,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Moon,
  Sun,
  Palette,
  RotateCcw,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function Home() {
  const [fields, setFields] = useState([
    {
      id: 1,
      name: "id",
      type: "autoincrement",
      options: {},
      allowNull: false,
      duplicateChance: 0,
    },
    {
      id: 2,
      name: "name",
      type: "name",
      options: { stringType: "fullname" },
      allowNull: false,
      duplicateChance: 0,
    },
    {
      id: 3,
      name: "email",
      type: "email",
      options: {},
      allowNull: false,
      duplicateChance: 0,
    },
  ])

  const [rowCount, setRowCount] = useState(10)
  const [previewData, setPreviewData] = useState([])
  const [downloadFilename, setDownloadFilename] = useState("shravan_test_data")
  const [showFilenameDialog, setShowFilenameDialog] = useState(false)
  const [downloadFormat, setDownloadFormat] = useState("sql")
  const [activeTab, setActiveTab] = useState("generator")
  const [theme, setTheme] = useState("light")
  const [uiTheme, setUiTheme] = useState("default")
  const [previewFormat, setPreviewFormat] = useState("table")
  const [fieldIdCounter, setFieldIdCounter] = useState(4)
  const [showApplyDialog, setShowApplyDialog] = useState(false)
  const [appliedFieldName, setAppliedFieldName] = useState("")

  const scrollContainerRef = useRef(null)

  const dataTypes = [
    { value: "autoincrement", label: "Auto Increment" },
    { value: "numeric", label: "Numeric" },
    { value: "string", label: "String" },
    { value: "name", label: "Name" },
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "address", label: "Address" },
    { value: "date", label: "Date" },
    { value: "datetime", label: "DateTime" },
    { value: "custom", label: "Custom" },
  ]

  const stringTypes = [
    { value: "fullname", label: "Full Names" },
    { value: "firstname", label: "First Names" },
    { value: "lastname", label: "Last Names" },
    { value: "countries", label: "Countries" },
    { value: "cities", label: "Cities" },
    { value: "products", label: "Product Names" },
    { value: "categories", label: "Product Categories" },
    { value: "companies", label: "Company Names" },
    { value: "departments", label: "Departments" },
    { value: "colors", label: "Colors" },
    { value: "lorem", label: "Lorem Ipsum" },
  ]

  const stringData = {
    fullname: [
      "John Smith",
      "Sarah Johnson",
      "Michael Brown",
      "Emily Davis",
      "David Wilson",
      "Lisa Anderson",
      "Robert Taylor",
      "Jennifer Martinez",
      "William Garcia",
      "Mary Rodriguez",
    ],
    firstname: ["John", "Sarah", "Michael", "Emily", "David", "Lisa", "Robert", "Jennifer", "William", "Mary"],
    lastname: ["Smith", "Johnson", "Brown", "Davis", "Wilson", "Anderson", "Taylor", "Martinez", "Garcia", "Rodriguez"],
    countries: [
      "India",
      "United States",
      "China",
      "Japan",
      "Germany",
      "United Kingdom",
      "France",
      "Brazil",
      "Canada",
      "Australia",
    ],
    cities: [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Chennai",
      "Kolkata",
      "Hyderabad",
      "Pune",
      "Ahmedabad",
      "Jaipur",
      "Lucknow",
    ],
    products: [
      "iPhone 15",
      "Samsung Galaxy S24",
      "MacBook Pro",
      "Dell XPS 13",
      "Sony WH-1000XM5",
      "AirPods Pro",
      "iPad Air",
      "Surface Pro",
      "ThinkPad X1",
      "HP Spectre",
    ],
    categories: [
      "Electronics",
      "Clothing",
      "Books",
      "Home & Garden",
      "Sports",
      "Beauty",
      "Automotive",
      "Toys",
      "Food",
      "Health",
    ],
    companies: [
      "Apple Inc",
      "Microsoft",
      "Google",
      "Amazon",
      "Meta",
      "Tesla",
      "Netflix",
      "Adobe",
      "Salesforce",
      "Oracle",
    ],
    departments: [
      "Engineering",
      "Marketing",
      "Sales",
      "HR",
      "Finance",
      "Operations",
      "Customer Support",
      "Research",
      "Legal",
      "Product",
    ],
    colors: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange", "Pink", "Black", "White", "Gray"],
    lorem: [
      "Lorem ipsum dolor sit amet",
      "Consectetur adipiscing elit",
      "Sed do eiusmod tempor",
      "Incididunt ut labore",
      "Et dolore magna aliqua",
      "Ut enim ad minim",
      "Veniam quis nostrud",
      "Exercitation ullamco",
      "Laboris nisi ut aliquip",
      "Ex ea commodo consequat",
    ],
  }

  const uiThemes = [
    { value: "default", label: "Default Blue", colors: "bg-blue-50 border-blue-200" },
    { value: "green", label: "Nature Green", colors: "bg-green-50 border-green-200" },
    { value: "purple", label: "Royal Purple", colors: "bg-purple-50 border-purple-200" },
    { value: "orange", label: "Sunset Orange", colors: "bg-orange-50 border-orange-200" },
    { value: "pink", label: "Rose Pink", colors: "bg-pink-50 border-pink-200" },
  ]

  const addField = () => {
    const newField = {
      id: fieldIdCounter,
      name: `field_${fieldIdCounter}`,
      type: "string",
      options: { stringType: "fullname" },
      allowNull: false,
      duplicateChance: 0,
    }
    setFields([...fields, newField])
    setFieldIdCounter(fieldIdCounter + 1)
  }

  const removeField = (id) => {
    setFields(fields.filter((field) => field.id !== id))
  }

  const duplicateField = (id) => {
    const fieldToDuplicate = fields.find((field) => field.id === id)
    if (fieldToDuplicate) {
      const newField = {
        ...fieldToDuplicate,
        id: fieldIdCounter,
        name: `${fieldToDuplicate.name}_copy`,
      }
      setFields([...fields, newField])
      setFieldIdCounter(fieldIdCounter + 1)
    }
  }

  const updateField = (id, updatedField) => {
    setFields(fields.map((field) => (field.id === id ? updatedField : field)))
  }

  const applyFieldChanges = (id) => {
    const field = fields.find((f) => f.id === id)
    if (field) {
      setAppliedFieldName(field.name)
      setShowApplyDialog(true)
      // Trigger regeneration of preview data
      generatePreviewData()
    }
  }

  const resetFieldChanges = (id) => {
    const field = fields.find((f) => f.id === id)
    if (field) {
      let resetOptions = {}
      if (field.type === "numeric") {
        resetOptions = {
          minDigits: 1,
          maxDigits: 5,
          numericType: "random",
          startValue: 1,
          stepValue: 1,
        }
      } else if (field.type === "string") {
        resetOptions = { stringType: "fullname" }
      } else if (field.type === "custom") {
        resetOptions = { customValue: "" }
      }
      updateField(id, { ...field, options: resetOptions })
      generatePreviewData()
    }
  }

  const generateFakeData = (field, rowIndex) => {
    // Handle null values
    if (field.allowNull && Math.random() < 0.1) {
      return null
    }

    // Handle duplicates
    if (field.duplicateChance > 0 && rowIndex > 0 && Math.random() < field.duplicateChance / 100) {
      // Return a previous value to create duplicate
      const prevIndex = Math.floor(Math.random() * rowIndex)
      return generateFakeData(field, prevIndex)
    }

    switch (field.type) {
      case "autoincrement":
        return rowIndex + 1
      case "numeric":
        const numericType = field.options.numericType || "random"

        if (numericType === "sequence") {
          const startValue = field.options.startValue || 1
          const stepValue = field.options.stepValue || 1
          return startValue + rowIndex * stepValue
        } else {
          const minDigits = field.options.minDigits || 1
          const maxDigits = field.options.maxDigits || 5
          const digits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits
          const min = Math.pow(10, digits - 1)
          const max = Math.pow(10, digits) - 1
          return Math.floor(Math.random() * (max - min + 1)) + min
        }
      case "string":
        const stringType = field.options.stringType || "fullname"
        const dataArray = stringData[stringType] || stringData.fullname
        return dataArray[rowIndex % dataArray.length]
      case "name":
        return stringData.fullname[rowIndex % stringData.fullname.length]
      case "email":
        const emailDomains = [
          "gmail.com",
          "yahoo.com",
          "hotmail.com",
          "outlook.com",
          "aol.com",
          "icloud.com",
          "protonmail.com",
          "zoho.com",
          "mail.com",
          "yandex.com",
          "fastmail.com",
          "tutanota.com",
          "gmx.com",
          "live.com",
          "msn.com",
          "rediffmail.com",
          "inbox.com",
          "hushmail.com",
          "guerrillamail.com",
          "tempmail.org",
        ]

        const emailPrefixes = [
          "john.smith",
          "sarah.johnson",
          "mike.brown",
          "emily.davis",
          "david.wilson",
          "lisa.anderson",
          "robert.taylor",
          "jennifer.martinez",
          "william.garcia",
          "mary.rodriguez",
          "james.miller",
          "patricia.moore",
          "christopher.jackson",
          "linda.white",
          "daniel.harris",
          "barbara.martin",
          "matthew.thompson",
          "elizabeth.garcia",
          "anthony.martinez",
          "helen.robinson",
          "mark.clark",
          "nancy.lewis",
          "donald.lee",
          "betty.walker",
          "steven.hall",
          "dorothy.allen",
          "paul.young",
          "sandra.hernandez",
          "andrew.king",
          "donna.wright",
          "joshua.lopez",
          "carol.hill",
          "kenneth.scott",
          "ruth.green",
          "kevin.adams",
          "sharon.baker",
          "brian.gonzalez",
          "michelle.nelson",
          "george.carter",
          "laura.mitchell",
          "edward.perez",
          "kimberly.roberts",
          "ronald.turner",
          "deborah.phillips",
          "timothy.campbell",
          "amy.parker",
          "jason.evans",
          "angela.edwards",
          "jeffrey.collins",
          "brenda.stewart",
          "ryan.sanchez",
          "emma.morris",
          "jacob.rogers",
          "olivia.reed",
          "gary.cook",
          "anna.morgan",
          "nicholas.bell",
          "melissa.murphy",
          "eric.bailey",
          "stephanie.rivera",
          "jonathan.cooper",
          "christina.richardson",
          "stephen.cox",
          "marie.howard",
          "larry.ward",
          "janet.torres",
          "justin.peterson",
          "catherine.gray",
          "scott.ramirez",
          "frances.james",
          "brandon.watson",
          "samantha.brooks",
          "benjamin.kelly",
          "debra.sanders",
          "samuel.price",
          "rachel.bennett",
          "frank.wood",
          "carolyn.barnes",
          "raymond.ross",
          "janet.henderson",
          "alexander.coleman",
          "virginia.jenkins",
          "patrick.perry",
          "maria.powell",
          "jack.long",
          "julie.patterson",
          "dennis.hughes",
          "joyce.flores",
          "jerry.washington",
          "diane.butler",
          "tyler.simmons",
          "alice.foster",
          "aaron.gonzales",
          "julie.bryant",
          "jose.alexander",
          "kathryn.russell",
          "henry.griffin",
          "gloria.diaz",
          "douglas.hayes",
          "teresa.myers",
          "peter.ford",
          "sara.hamilton",
          "zachary.graham",
          "janice.sullivan",
          "noah.wallace",
          "kelly.woods",
          "christian.cole",
          "beverly.west",
          "walter.jordan",
          "ann.owens",
          "harold.reynolds",
          "jean.fisher",
          "jordan.ellis",
          "judith.gibson",
          "arthur.mason",
          "andrea.hunt",
          "albert.palmer",
          "rose.berry",
          "wayne.rice",
          "theresa.chapman",
          "bruce.robertson",
          "phyllis.kennedy",
          "ralph.lane",
          "gloria.warren",
          "roy.wells",
        ]

        const uniqueEmailPrefix = emailPrefixes[rowIndex % emailPrefixes.length]
        const uniqueDomain = emailDomains[Math.floor(rowIndex / 5) % emailDomains.length]

        // Add some variation to make emails more unique
        const variation = rowIndex > emailPrefixes.length ? Math.floor(rowIndex / emailPrefixes.length) : ""

        return `${uniqueEmailPrefix}${variation ? variation : ""}@${uniqueDomain}`
      case "phone":
        return `+91-${String(Math.floor(Math.random() * 10000000000)).padStart(10, "0")}`
      case "address":
        return `${rowIndex + 100} Main Street, City ${(rowIndex % 10) + 1}`
      case "date":
        const date = new Date()
        date.setDate(date.getDate() - rowIndex)
        return date.toISOString().split("T")[0]
      case "datetime":
        const datetime = new Date()
        datetime.setHours(datetime.getHours() - rowIndex)
        return datetime.toISOString().replace("T", " ").split(".")[0]
      case "custom":
        return field.options.customValue || `Custom ${rowIndex + 1}`
      default:
        return `Data ${rowIndex + 1}`
    }
  }

  const generatePreviewData = () => {
    const data = []
    for (let i = 0; i < Math.min(10, rowCount); i++) {
      const row = {}
      fields.forEach((field) => {
        row[field.name] = generateFakeData(field, i)
      })
      data.push(row)
    }
    setPreviewData(data)
  }

  const generateFullData = () => {
    const data = []
    for (let i = 0; i < rowCount; i++) {
      const row = {}
      fields.forEach((field) => {
        row[field.name] = generateFakeData(field, i)
      })
      data.push(row)
    }
    return data
  }

  const generateSQL = (data) => {
    const tableName = "test_data"
    let sql = `CREATE TABLE ${tableName} (\n`

    fields.forEach((field, index) => {
      let fieldType = "VARCHAR(255)"
      if (field.type === "autoincrement") fieldType = "INT AUTO_INCREMENT PRIMARY KEY"
      else if (field.type === "numeric") fieldType = "INT"
      else if (field.type === "date") fieldType = "DATE"
      else if (field.type === "datetime") fieldType = "DATETIME"

      const nullConstraint = field.allowNull ? "" : " NOT NULL"
      sql += `  \`${field.name}\` ${fieldType}${nullConstraint}${index < fields.length - 1 ? "," : ""}\n`
    })

    sql += ");\n\n"

    data.forEach((row) => {
      sql += `INSERT INTO ${tableName} (`
      sql += fields.map((f) => `\`${f.name}\``).join(", ")
      sql += ") VALUES ("
      sql += fields
        .map((field) => {
          const value = row[field.name]
          if (value === null) return "NULL"
          if (field.type === "date" || field.type === "datetime" || typeof value === "string") {
            return `'${value}'`
          }
          return value
        })
        .join(", ")
      sql += ");\n"
    })

    return sql
  }

  const generateCSV = (data) => {
    const header = fields.map((f) => f.name).join(",")
    const rows = data.map((row) => {
      return fields
        .map((field) => {
          const value = row[field.name]
          if (value === null) return ""
          if (typeof value === "string" && value.includes(",")) {
            return `"${value}"`
          }
          return value
        })
        .join(",")
    })

    return [header, ...rows].join("\n")
  }

  const generateJSON = (data) => {
    return JSON.stringify(data, null, 2)
  }

  const generateHTML = (data) => {
    let html = `<!DOCTYPE html>
<html>
<head>
    <title>ShravanTestingDataGeneration - Test Data</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f2f2f2; }
        tr:nth-child(even) { background-color: #f9f9f9; }
    </style>
</head>
<body>
    <h1>Test Data Generated by ShravanTestingDataGeneration</h1>
    <table>
        <thead>
            <tr>`

    fields.forEach((field) => {
      html += `<th>${field.name}</th>`
    })

    html += `</tr>
        </thead>
        <tbody>`

    data.forEach((row) => {
      html += `<tr>`
      fields.forEach((field) => {
        const value = row[field.name]
        html += `<td>${value === null ? "NULL" : value}</td>`
      })
      html += `</tr>`
    })

    html += `</tbody>
    </table>
</body>
</html>`

    return html
  }

  const generateXML = (data) => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<data>
    <metadata>
        <generator>ShravanTestingDataGeneration</generator>
        <timestamp>${new Date().toISOString()}</timestamp>
        <records>${data.length}</records>
    </metadata>
    <records>`

    data.forEach((row, index) => {
      xml += `
        <record id="${index + 1}">`
      fields.forEach((field) => {
        const value = row[field.name]
        xml += `
            <${field.name}>${value === null ? "" : value}</${field.name}>`
      })
      xml += `
        </record>`
    })

    xml += `
    </records>
</data>`

    return xml
  }

  const downloadData = () => {
    setShowFilenameDialog(true)
  }

  const confirmDownload = () => {
    const data = generateFullData()
    let content = ""
    let mimeType = ""
    let fileExtension = ""

    switch (downloadFormat) {
      case "sql":
        content = generateSQL(data)
        mimeType = "application/sql"
        fileExtension = "sql"
        break
      case "csv":
        content = generateCSV(data)
        mimeType = "text/csv"
        fileExtension = "csv"
        break
      case "json":
        content = generateJSON(data)
        mimeType = "application/json"
        fileExtension = "json"
        break
      case "html":
        content = generateHTML(data)
        mimeType = "text/html"
        fileExtension = "html"
        break
      case "xml":
        content = generateXML(data)
        mimeType = "application/xml"
        fileExtension = "xml"
        break
      case "xlsx":
        // For XLSX, we'll generate CSV and let user know to save as Excel
        content = generateCSV(data)
        mimeType = "text/csv"
        fileExtension = "csv"
        break
      default:
        content = generateJSON(data)
        mimeType = "application/json"
        fileExtension = "json"
    }

    const blob = new Blob([content], { type: mimeType })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${downloadFilename}.${fileExtension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowFilenameDialog(false)
  }

  const scrollTo = (direction) => {
    if (!scrollContainerRef.current) return

    const container = scrollContainerRef.current
    const scrollAmount = 200

    switch (direction) {
      case "top":
        container.scrollTo({ top: 0, behavior: "smooth" })
        break
      case "bottom":
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" })
        break
      case "left":
        container.scrollTo({ left: container.scrollLeft - scrollAmount, behavior: "smooth" })
        break
      case "right":
        container.scrollTo({ left: container.scrollLeft + scrollAmount, behavior: "smooth" })
        break
    }
  }

  const scrollToWebsiteTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const scrollToWebsiteBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
  }

  const renderPreview = () => {
    const data = previewData

    switch (previewFormat) {
      case "json":
        return <pre className="text-xs overflow-auto max-h-[400px] bg-muted p-4 rounded">{generateJSON(data)}</pre>
      case "csv":
        return <pre className="text-xs overflow-auto max-h-[400px] bg-muted p-4 rounded">{generateCSV(data)}</pre>
      case "sql":
        return <pre className="text-xs overflow-auto max-h-[400px] bg-muted p-4 rounded">{generateSQL(data)}</pre>
      case "html":
        return (
          <div
            className="text-xs overflow-auto max-h-[400px] bg-muted p-4 rounded"
            dangerouslySetInnerHTML={{ __html: generateHTML(data) }}
          />
        )
      default:
        return (
          <div className="border rounded-md overflow-auto max-h-[400px]" ref={scrollContainerRef}>
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-muted sticky top-0">
                <tr>
                  {fields.map((field) => (
                    <th
                      key={field.id}
                      className="px-4 py-2 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider"
                    >
                      {field.name}
                      {field.allowNull && (
                        <Badge variant="secondary" className="ml-1 text-xs">
                          NULL
                        </Badge>
                      )}
                      {field.duplicateChance > 0 && (
                        <Badge variant="outline" className="ml-1 text-xs">
                          DUP
                        </Badge>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-card divide-y divide-border">
                {data.map((row, rowIndex) => (
                  <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-background" : ""}>
                    {fields.map((field) => (
                      <td key={field.id} className="px-4 py-2 text-sm">
                        {row[field.name] === null ? (
                          <span className="text-muted-foreground italic">NULL</span>
                        ) : (
                          row[field.name]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
    }
  }

  useEffect(() => {
    generatePreviewData()
  }, [fields, rowCount])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const getThemeClasses = () => {
    const baseClasses = "min-h-screen transition-colors duration-300"

    switch (uiTheme) {
      case "green":
        return `${baseClasses} bg-green-50 dark:bg-green-950`
      case "purple":
        return `${baseClasses} bg-purple-50 dark:bg-purple-950`
      case "orange":
        return `${baseClasses} bg-orange-50 dark:bg-orange-950`
      case "pink":
        return `${baseClasses} bg-pink-50 dark:bg-pink-950`
      default:
        return `${baseClasses} bg-blue-50 dark:bg-blue-950`
    }
  }

  return (
    <div className={getThemeClasses()} style={{ fontFamily: "'Cascadia Mono', monospace" }}>
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ShravanTestingDataGeneration</h1>
          <div className="flex items-center gap-4">
            <Select value={uiTheme} onValueChange={setUiTheme}>
              <SelectTrigger className="w-40">
                <Palette className="mr-2 h-4 w-4" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {uiThemes.map((theme) => (
                  <SelectItem key={theme.value} value={theme.value}>
                    {theme.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6">
        <Tabs defaultValue="generator" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="generator">Generator</TabsTrigger>
            <TabsTrigger value="configuration">Configuration</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Fields Configuration</h2>
              <Button onClick={addField}>
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </div>

            <div className="grid gap-4">
              {fields.map((field) => (
                <Card key={field.id} className="relative">
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor={`field-name-${field.id}`}>Field Name</Label>
                        <Input
                          id={`field-name-${field.id}`}
                          value={field.name}
                          onChange={(e) => updateField(field.id, { ...field, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label htmlFor={`field-type-${field.id}`}>Data Type</Label>
                        <Select
                          value={field.type}
                          onValueChange={(value) => updateField(field.id, { ...field, type: value, options: {} })}
                        >
                          <SelectTrigger id={`field-type-${field.id}`}>
                            <SelectValue placeholder="Select data type" />
                          </SelectTrigger>
                          <SelectContent>
                            {dataTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`allow-null-${field.id}`}
                          checked={field.allowNull}
                          onCheckedChange={(checked) => updateField(field.id, { ...field, allowNull: checked })}
                        />
                        <Label htmlFor={`allow-null-${field.id}`} className="text-sm">
                          Allow NULL
                        </Label>
                      </div>
                      <div className="flex items-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => duplicateField(field.id)}>
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => removeField(field.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Duplicate Chance */}
                    <div className="mt-4">
                      <Label htmlFor={`duplicate-chance-${field.id}`}>Duplicate Chance: {field.duplicateChance}%</Label>
                      <Slider
                        id={`duplicate-chance-${field.id}`}
                        min={0}
                        max={50}
                        step={5}
                        value={[field.duplicateChance]}
                        onValueChange={(value) => updateField(field.id, { ...field, duplicateChance: value[0] })}
                        className="mt-2"
                      />
                    </div>

                    {/* Custom field options */}
                    {field.type === "numeric" && (
                      <div className="mt-4 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor={`min-digits-${field.id}`}>Min Digits</Label>
                            <Input
                              id={`min-digits-${field.id}`}
                              type="number"
                              min="1"
                              max="10"
                              value={field.options.minDigits || 1}
                              onChange={(e) =>
                                updateField(field.id, {
                                  ...field,
                                  options: {
                                    ...field.options,
                                    minDigits: Math.max(1, Math.min(10, Number.parseInt(e.target.value) || 1)),
                                  },
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`max-digits-${field.id}`}>Max Digits</Label>
                            <Input
                              id={`max-digits-${field.id}`}
                              type="number"
                              min="1"
                              max="10"
                              value={field.options.maxDigits || 5}
                              onChange={(e) =>
                                updateField(field.id, {
                                  ...field,
                                  options: {
                                    ...field.options,
                                    maxDigits: Math.max(1, Math.min(10, Number.parseInt(e.target.value) || 5)),
                                  },
                                })
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <Label htmlFor={`numeric-type-${field.id}`}>Number Generation Type</Label>
                          <Select
                            value={field.options.numericType || "random"}
                            onValueChange={(value) =>
                              updateField(field.id, {
                                ...field,
                                options: { ...field.options, numericType: value },
                              })
                            }
                          >
                            <SelectTrigger id={`numeric-type-${field.id}`}>
                              <SelectValue placeholder="Select generation type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="random">Random Digits</SelectItem>
                              <SelectItem value="sequence">Sequential Numbers</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {field.options.numericType === "sequence" && (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`start-value-${field.id}`}>Start Value</Label>
                              <Input
                                id={`start-value-${field.id}`}
                                type="number"
                                value={field.options.startValue || 1}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    ...field,
                                    options: {
                                      ...field.options,
                                      startValue: Number.parseInt(e.target.value) || 1,
                                    },
                                  })
                                }
                              />
                            </div>
                            <div>
                              <Label htmlFor={`step-value-${field.id}`}>Step Value</Label>
                              <Input
                                id={`step-value-${field.id}`}
                                type="number"
                                value={field.options.stepValue || 1}
                                onChange={(e) =>
                                  updateField(field.id, {
                                    ...field,
                                    options: {
                                      ...field.options,
                                      stepValue: Number.parseInt(e.target.value) || 1,
                                    },
                                  })
                                }
                              />
                            </div>
                          </div>
                        )}

                        <div className="text-sm text-muted-foreground">
                          Preview: {(() => {
                            const numericType = field.options.numericType || "random"
                            if (numericType === "sequence") {
                              const startValue = field.options.startValue || 1
                              const stepValue = field.options.stepValue || 1
                              return `${startValue}, ${startValue + stepValue}, ${startValue + stepValue * 2}, ... (Sequential)`
                            } else {
                              const minDigits = field.options.minDigits || 1
                              const maxDigits = field.options.maxDigits || 5
                              const digits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits
                              const min = Math.pow(10, digits - 1)
                              const max = Math.pow(10, digits) - 1
                              return `${min} - ${max} (${digits} digits, Random)`
                            }
                          })()}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => applyFieldChanges(field.id)}>
                            Apply Changes
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => resetFieldChanges(field.id)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    )}

                    {field.type === "string" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor={`string-type-${field.id}`}>String Data Type</Label>
                          <Select
                            value={field.options.stringType || "fullname"}
                            onValueChange={(value) =>
                              updateField(field.id, {
                                ...field,
                                options: { ...field.options, stringType: value },
                              })
                            }
                          >
                            <SelectTrigger id={`string-type-${field.id}`}>
                              <SelectValue placeholder="Select string type" />
                            </SelectTrigger>
                            <SelectContent>
                              {stringTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => applyFieldChanges(field.id)}>
                            Apply Changes
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => resetFieldChanges(field.id)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    )}

                    {field.type === "custom" && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <Label htmlFor={`custom-value-${field.id}`}>Custom Value Pattern</Label>
                          <Textarea
                            id={`custom-value-${field.id}`}
                            value={field.options.customValue || ""}
                            onChange={(e) =>
                              updateField(field.id, {
                                ...field,
                                options: { ...field.options, customValue: e.target.value },
                              })
                            }
                            placeholder="Enter custom value pattern"
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => applyFieldChanges(field.id)}>
                            Apply Changes
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => resetFieldChanges(field.id)}>
                            <RotateCcw className="mr-2 h-4 w-4" />
                            Reset
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-4">
              <Button onClick={addField}>
                <Plus className="mr-2 h-4 w-4" />
                Add Field
              </Button>
            </div>

            {/* Website Scroll Controls */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-40">
              <Button
                size="sm"
                variant="outline"
                className="rounded-full w-12 h-12 shadow-lg bg-background/80 backdrop-blur-sm border-2"
                onClick={scrollToWebsiteTop}
                title="Scroll to top of website"
              >
                <ArrowUp className="h-5 w-5" />
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-full w-12 h-12 shadow-lg bg-background/80 backdrop-blur-sm border-2"
                onClick={scrollToWebsiteBottom}
                title="Scroll to bottom of website"
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="configuration">
            <Card>
              <CardHeader>
                <CardTitle>Data Generation Configuration</CardTitle>
                <CardDescription>Configure how your data is generated</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="row-count">Number of Rows: {rowCount.toLocaleString()}</Label>
                    <span className="text-sm text-muted-foreground">(0 - 1,000,000)</span>
                  </div>
                  <Input
                    id="row-count"
                    type="number"
                    min="0"
                    max="1000000"
                    value={rowCount}
                    onChange={(e) => setRowCount(Number.parseInt(e.target.value) || 0)}
                  />
                  <Slider
                    min={0}
                    max={1000000}
                    step={100}
                    value={[rowCount]}
                    onValueChange={(value) => setRowCount(value[0])}
                    className="mt-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="download-format">Export Format</Label>
                  <Select value={downloadFormat} onValueChange={setDownloadFormat}>
                    <SelectTrigger id="download-format">
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sql">SQL</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                      <SelectItem value="xml">XML</SelectItem>
                      <SelectItem value="xlsx">Excel (CSV)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={downloadData} className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Download Data
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Data Preview</CardTitle>
                    <CardDescription>Preview your generated data in different formats</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={previewFormat} onValueChange={setPreviewFormat}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="table">Table</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="sql">SQL</SelectItem>
                        <SelectItem value="html">HTML</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button size="sm" onClick={generatePreviewData}>
                      <Eye className="mr-2 h-4 w-4" />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {renderPreview()}

                  {/* Scroll Controls */}
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    <Button size="sm" variant="outline" onClick={() => scrollTo("top")}>
                      <ArrowUp className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => scrollTo("left")}>
                      <ArrowLeft className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => scrollTo("right")}>
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => scrollTo("bottom")}>
                      <ArrowDown className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Application Settings</CardTitle>
                <CardDescription>Customize your generator settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="default-filename">Default Filename</Label>
                  <Input
                    id="default-filename"
                    value={downloadFilename}
                    onChange={(e) => setDownloadFilename(e.target.value)}
                    placeholder="Enter default filename"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ui-theme">UI Theme</Label>
                  <Select value={uiTheme} onValueChange={setUiTheme}>
                    <SelectTrigger id="ui-theme">
                      <SelectValue placeholder="Select UI theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {uiThemes.map((theme) => (
                        <SelectItem key={theme.value} value={theme.value}>
                          {theme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="dark-mode"
                    checked={theme === "dark"}
                    onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                  />
                  <Label htmlFor="dark-mode">Dark mode</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preview-format-setting">Default Preview Format</Label>
                  <Select value={previewFormat} onValueChange={setPreviewFormat}>
                    <SelectTrigger id="preview-format-setting">
                      <SelectValue placeholder="Select preview format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="table">Table</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="sql">SQL</SelectItem>
                      <SelectItem value="html">HTML</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changes Applied Successfully</DialogTitle>
            <DialogDescription>
              The configuration changes for field "{appliedFieldName}" have been applied successfully. The preview data
              has been regenerated with the new settings.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => setShowApplyDialog(false)}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showFilenameDialog} onOpenChange={setShowFilenameDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download File</DialogTitle>
            <DialogDescription>Enter a filename for your {downloadFormat.toUpperCase()} download</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="filename">Filename</Label>
              <Input
                id="filename"
                value={downloadFilename}
                onChange={(e) => setDownloadFilename(e.target.value)}
                placeholder="Enter filename without extension"
              />
              <p className="text-sm text-muted-foreground">
                File will be saved as: {downloadFilename}.{downloadFormat === "xlsx" ? "csv" : downloadFormat}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFilenameDialog(false)}>
              Cancel
            </Button>
            <Button onClick={confirmDownload}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
