"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import type {
  Field,
  GeneratorConfig,
  DataType,
  CustomDataType,
  ColumnType,
  SettingsConfig,
  SchemaTemplate,
  OutputFormat,
} from "@/types"
import { v4 as uuidv4 } from "uuid"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import {
  Download,
  Copy,
  Plus,
  Trash2,
  Settings,
  Eye,
  FileDown,
  Database,
  Sliders,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Palette,
  LayoutTemplate,
  Cpu,
  Import,
  ImportIcon as Export,
  List,
  ArrowUp,
  Clock,
  Moon,
  Sun,
  Sparkles,
  Layers,
  FileJson,
  FileSpreadsheetIcon as FileCsv,
  FileCode,
  FileType,
  Wand2,
  Loader2,
  ChevronRight,
  ChevronLeft,
  HelpCircle,
  EyeOff,
  FileSpreadsheet,
  FileText,
} from "lucide-react"

// Default templates for common data schemas
const DEFAULT_TEMPLATES: SchemaTemplate[] = [
  {
    id: uuidv4(),
    name: "User Profile",
    description: "Basic user profile information",
    fields: [
      { id: uuidv4(), name: "id", type: "id", columnType: "string" },
      { id: uuidv4(), name: "full_name", type: "fullName", columnType: "string" },
      { id: uuidv4(), name: "email", type: "email", columnType: "string" },
      { id: uuidv4(), name: "phone", type: "phone", columnType: "string" },
      { id: uuidv4(), name: "address", type: "address", columnType: "string" },
      { id: uuidv4(), name: "city", type: "city", columnType: "string" },
      { id: uuidv4(), name: "state", type: "state", columnType: "string" },
      { id: uuidv4(), name: "zip_code", type: "zipCode", columnType: "string" },
    ],
  },
  {
    id: uuidv4(),
    name: "Employee",
    description: "Employee data for HR systems",
    fields: [
      { id: uuidv4(), name: "employee_id", type: "id", columnType: "string" },
      { id: uuidv4(), name: "first_name", type: "firstName", columnType: "string" },
      { id: uuidv4(), name: "last_name", type: "lastName", columnType: "string" },
      { id: uuidv4(), name: "email", type: "email", columnType: "string" },
      { id: uuidv4(), name: "department", type: "department", columnType: "string" },
      { id: uuidv4(), name: "job_title", type: "jobTitle", columnType: "string" },
      { id: uuidv4(), name: "hire_date", type: "date", columnType: "date" },
    ],
  },
  {
    id: uuidv4(),
    name: "Product Catalog",
    description: "E-commerce product information",
    fields: [
      { id: uuidv4(), name: "product_id", type: "id", columnType: "string" },
      { id: uuidv4(), name: "product_name", type: "custom", customName: "Product", columnType: "string" },
      {
        id: uuidv4(),
        name: "category",
        type: "custom",
        customName: "Category",
        columnType: "string",
        customValues: ["Electronics", "Clothing", "Home", "Books", "Sports", "Beauty"],
      },
      { id: uuidv4(), name: "price", type: "custom", columnType: "float" },
      { id: uuidv4(), name: "in_stock", type: "custom", columnType: "boolean" },
      { id: uuidv4(), name: "description", type: "custom", columnType: "text" },
    ],
  },
]

const DEFAULT_FIELDS: Field[] = [
  { id: uuidv4(), name: "id", type: "id", columnType: "string" },
  { id: uuidv4(), name: "full_name", type: "fullName", columnType: "string" },
  { id: uuidv4(), name: "email", type: "email", columnType: "string" },
  { id: uuidv4(), name: "phone", type: "phone", columnType: "string" },
]

const DEFAULT_SETTINGS: SettingsConfig = {
  darkMode: true,
  fontSize: 14,
  showLineNumbers: true,
  compactMode: false,
  defaultFormat: "json",
  defaultRows: 10,
}

const DATA_TYPES: { value: DataType; label: string; icon: any }[] = [
  { value: "fullName", label: "Full Name", icon: null },
  { value: "firstName", label: "First Name", icon: null },
  { value: "lastName", label: "Last Name", icon: null },
  { value: "email", label: "Email", icon: null },
  { value: "phone", label: "Phone", icon: null },
  { value: "address", label: "Address", icon: null },
  { value: "city", label: "City", icon: null },
  { value: "state", label: "State", icon: null },
  { value: "zipCode", label: "Zip Code", icon: null },
  { value: "country", label: "Country", icon: null },
  { value: "company", label: "Company", icon: null },
  { value: "jobTitle", label: "Job Title", icon: null },
  { value: "department", label: "Department", icon: null },
  { value: "gender", label: "Gender", icon: null },
  { value: "date", label: "Date", icon: null },
  { value: "time", label: "Time", icon: null },
  { value: "color", label: "Color", icon: null },
  { value: "url", label: "URL", icon: null },
  { value: "id", label: "ID", icon: null },
  { value: "integer", label: "Integer", icon: null },
  { value: "float", label: "Float", icon: null },
  { value: "boolean", label: "Boolean", icon: null },
  { value: "custom", label: "Custom", icon: null },
]

// Modify the COLUMN_TYPES array to remove date, time, datetime, and text
const COLUMN_TYPES: { value: ColumnType; label: string }[] = [
  { value: "string", label: "String" },
  { value: "integer", label: "Integer" },
  { value: "float", label: "Float" },
  { value: "double", label: "Double" },
  { value: "boolean", label: "Boolean" },
]

const OUTPUT_FORMATS: { value: OutputFormat; label: string; icon: any }[] = [
  { value: "json", label: "JSON", icon: FileJson },
  { value: "csv", label: "CSV", icon: FileCsv },
  { value: "sql", label: "SQL", icon: FileCode },
  { value: "html", label: "HTML", icon: FileType },
]

// Extended export formats
const EXPORT_FORMATS = [
  { value: "json", label: "JSON", icon: FileJson },
  { value: "csv", label: "CSV", icon: FileCsv },
  { value: "sql", label: "SQL", icon: FileCode },
  { value: "html", label: "HTML", icon: FileType },
  { value: "xlsx", label: "Excel (XLSX)", icon: FileSpreadsheet },
  { value: "xml", label: "XML", icon: FileText },
  { value: "txt", label: "Text", icon: FileText },
]

// Pattern templates for common formats
const PATTERN_TEMPLATES = [
  { label: "Phone (###-###-####)", value: "[0-9]{3}-[0-9]{3}-[0-9]{4}" },
  { label: "SSN (###-##-####)", value: "[0-9]{3}-[0-9]{2}-[0-9]{4}" },
  { label: "Credit Card (#### #### #### ####)", value: "[0-9]{4} [0-9]{4} [0-9]{4} [0-9]{4}" },
  {
    label: "UUID (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx)",
    value: "[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}",
  },
  {
    label: "IP Address (xxx.xxx.xxx.xxx)",
    value:
      "(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)",
  },
  { label: "Product Code (ABC-12345)", value: "[A-Z]{3}-[0-9]{5}" },
  { label: "Username (@username)", value: "@[a-z0-9_]{5,15}" },
  { label: "Hashtag (#topic)", value: "#[a-zA-Z0-9_]{1,30}" },
]

// Case options for string types
const CASE_OPTIONS = [
  { value: "none", label: "No Change" },
  { value: "lower", label: "lowercase" },
  { value: "upper", label: "UPPERCASE" },
  { value: "title", label: "Title Case" },
  { value: "sentence", label: "Sentence case" },
]

// Function to format date and time
const formatDateTime = () => {
  const now = new Date()
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }
  return now.toLocaleDateString("en-US", options)
}

export default function DataGenerator() {
  const [config, setConfig] = useState<GeneratorConfig>({
    rows: 10,
    format: "json",
    fields: DEFAULT_FIELDS,
    tableName: "mock_data",
    customDataTypes: [],
    templates: DEFAULT_TEMPLATES,
  })
  const [generatedData, setGeneratedData] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [showTest, setShowTest] = useState(false)
  const [settings, setSettings] = useState<SettingsConfig>(DEFAULT_SETTINGS)
  const [showSettings, setShowSettings] = useState(false)
  const [filename, setFilename] = useState("mock_data")
  const [showCustomTypeDialog, setShowCustomTypeDialog] = useState(false)
  const [newCustomType, setNewCustomType] = useState<CustomDataType>({
    id: uuidv4(),
    name: "",
    columnType: "string",
  })
  const [activeTab, setActiveTab] = useState("configure")
  const [isGenerating, setIsGenerating] = useState(false)
  const [showAddFieldDialog, setShowAddFieldDialog] = useState(false)
  const [newField, setNewField] = useState<Field>({
    id: uuidv4(),
    name: "",
    type: "fullName",
    columnType: "string",
  })
  const [showDownloadDialog, setShowDownloadDialog] = useState(false)
  const [downloadFilename, setDownloadFilename] = useState("")
  const [downloadFormat, setDownloadFormat] = useState<string>("json")
  const [isLargeScreen, setIsLargeScreen] = useState(false)
  const [showTemplateDialog, setShowTemplateDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [exportFormat, setExportFormat] = useState<string>("json")
  const [showImportDialog, setShowImportDialog] = useState(false)
  const [importConfig, setImportConfig] = useState("")
  const [importFormat, setImportFormat] = useState<string>("json")
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [primaryColor, setPrimaryColor] = useState("#3b82f6") // Changed to blue
  const [accentColor, setAccentColor] = useState("#10b981") // Changed to emerald
  const [showPreviewOptions, setShowPreviewOptions] = useState(false)
  const [previewFormat, setPreviewFormat] = useState<"raw" | "formatted">("formatted")
  const [addToCustomTypes, setAddToCustomTypes] = useState(true)
  const [selectedPatternTemplate, setSelectedPatternTemplate] = useState("")
  const [minValue, setMinValue] = useState(0)
  const [maxValue, setMaxValue] = useState(1000)
  const [precision, setPrecision] = useState(2)
  const [nullPercentage, setNullPercentage] = useState(0)
  const [uniqueValues, setUniqueValues] = useState(false)
  const [prefix, setPrefix] = useState("")
  const [suffix, setSuffix] = useState("")
  const [caseOption, setCaseOption] = useState("none")
  const [customDataTypesList, setCustomDataTypesList] = useState<CustomDataType[]>([])
  const [showCustomDataTypesList, setShowCustomDataTypesList] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [numDigits, setNumDigits] = useState(5)
  const [currentDateTime, setCurrentDateTime] = useState(formatDateTime())
  const [fullScreenPreview, setFullScreenPreview] = useState(false)
  const [showHelpDialog, setShowHelpDialog] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // Add these new state variables
  const [idGenerationType, setIdGenerationType] = useState<"sequential" | "random">("sequential")
  const [integerGenerationType, setIntegerGenerationType] = useState<"sequential" | "random">("random")
  const [floatGenerationType, setFloatGenerationType] = useState<"sequential" | "random">("random")

  // Add state variables for number configuration
  const [showFieldNumberConfigDialog, setShowFieldNumberConfigDialog] = useState(false)
  const [currentEditingFieldId, setCurrentEditingFieldId] = useState<string | null>(null)
  const [numberConfigType, setNumberConfigType] = useState<ColumnType>("integer")
  const [numberMin, setNumberMin] = useState(0)
  const [numberMax, setNumberMax] = useState(1000)
  const [numberDigits, setNumberDigits] = useState(5)
  const [numberPrecision, setNumberPrecision] = useState(2)
  const [numberGenerationType, setNumberGenerationType] = useState<"sequential" | "random">("random")

  const { theme, setTheme } = useTheme()
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Generate data on initial load
    handleGenerateData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Set initial value
      setIsLargeScreen(window.innerWidth >= 1024)

      // Add resize listener
      const handleResize = () => {
        setIsLargeScreen(window.innerWidth >= 1024)
      }

      // Add scroll listener for back to top button
      const handleScroll = () => {
        if (window.scrollY > 300) {
          setShowBackToTop(true)
        } else {
          setShowBackToTop(false)
        }
      }

      window.addEventListener("resize", handleResize)
      window.addEventListener("scroll", handleScroll)

      // Clean up
      return () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  // Update date and time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(formatDateTime())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleGenerateData = async () => {
    setIsGenerating(true)
    try {
      const { generateData } = await import("@/lib/data-generator")
      const data = generateData(config)
      setGeneratedData(data)
      // Auto-show preview when data is generated
      setShowPreview(true)
    } catch (error) {
      console.error("Error generating data:", error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedData)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const finalFilename = downloadFilename || filename
    const blob = new Blob([generatedData], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url

    const extension = downloadFormat
    a.download = `${finalFilename}.${extension}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowDownloadDialog(false)
  }

  const handleAddField = () => {
    // If the field type is custom and addToCustomTypes is true, add it to the custom data types list
    if (newField.type === "custom" && addToCustomTypes && newField.customName) {
      const existingType = config.customDataTypes.find((type) => type.name === newField.customName)

      if (!existingType) {
        const newCustomType: CustomDataType = {
          id: uuidv4(),
          name: newField.customName,
          columnType: newField.columnType || "string",
          pattern: newField.customPattern,
          values: newField.customValues,
          description: `Custom type for ${newField.name}`,
        }

        setConfig({
          ...config,
          customDataTypes: [...config.customDataTypes, newCustomType],
          fields: [...config.fields, { ...newField, id: uuidv4() }],
        })
      } else {
        // Just add the field if the custom type already exists
        setConfig({
          ...config,
          fields: [...config.fields, { ...newField, id: uuidv4() }],
        })
      }
    } else {
      // Regular field addition
      setConfig({
        ...config,
        fields: [...config.fields, { ...newField, id: uuidv4() }],
      })
    }

    // Reset the new field form
    setNewField({
      id: uuidv4(),
      name: "",
      type: "fullName",
      columnType: "string",
    })
    setAddToCustomTypes(true)
    setShowAddFieldDialog(false)
  }

  const handleRemoveField = (id: string) => {
    setConfig({
      ...config,
      fields: config.fields.filter((field) => field.id !== id),
    })
  }

  // Add enhanced handling when the column type changes for a field
  // Inside the handleFieldChange function, add this extra handling:
  const handleFieldChange = (id: string, key: keyof Field, value: any) => {
    // Existing code
    setConfig({
      ...config,
      fields: config.fields.map((field) => {
        if (field.id === id) {
          const updatedField = { ...field, [key]: value }

          // When changing column type to integer, float, or double, show config dialog
          if (key === "columnType" && (value === "integer" || value === "float" || value === "double")) {
            setShowFieldNumberConfigDialog(true)
            setCurrentEditingFieldId(id)
            setNumberConfigType(value as ColumnType)
            // Initialize with current values or defaults
            setNumberMin(field.minValue || 0)
            setNumberMax(field.maxValue || 1000)
            setNumberDigits(field.digits || 5)
            setNumberGenerationType((field.generationType as "sequential" | "random") || "random")
            if (value === "float" || value === "double") {
              setNumberPrecision(field.precision || 2)
            }
          }

          return updatedField
        }
        return field
      }),
    })
  }

  const handleAddCustomDataType = () => {
    if (!newCustomType.name) return

    // Auto-detect type based on name
    let columnType = newCustomType.columnType
    let minVal = minValue
    let maxVal = maxValue
    const prec = precision

    // If name ends with "name", set to string
    if (newCustomType.name.toLowerCase().endsWith("name")) {
      columnType = "string"
    }
    // If name ends with "id" or "number", set to integer or float
    else if (newCustomType.name.toLowerCase().endsWith("id") || newCustomType.name.toLowerCase().endsWith("number")) {
      // Use the selected column type (integer or float)
      // Set min/max values based on numDigits
      if (numDigits > 0) {
        minVal = Math.pow(10, numDigits - 1)
        maxVal = Math.pow(10, numDigits) - 1
      }
    }

    // Add additional properties to the custom data type
    const enhancedCustomType = {
      ...newCustomType,
      id: uuidv4(),
      columnType,
      minValue: columnType === "integer" || columnType === "float" || columnType === "double" ? minVal : undefined,
      maxValue: columnType === "integer" || columnType === "float" || columnType === "double" ? maxVal : undefined,
      precision: columnType === "float" || columnType === "double" ? prec : undefined,
      nullPercentage,
      uniqueValues,
      prefix: prefix || undefined,
      suffix: suffix || undefined,
      caseOption: columnType === "string" ? caseOption : undefined,
    }

    setConfig({
      ...config,
      customDataTypes: [...config.customDataTypes, enhancedCustomType],
    })

    // Add to the custom data types list for easy access
    setCustomDataTypesList([...customDataTypesList, enhancedCustomType])

    // Reset form
    setNewCustomType({
      id: uuidv4(),
      name: "",
      columnType: "string",
    })
    setMinValue(0)
    setMaxValue(1000)
    setPrecision(2)
    setNullPercentage(0)
    setUniqueValues(false)
    setPrefix("")
    setSuffix("")
    setCaseOption("none")
    setSelectedPatternTemplate("")
    setNumDigits(5)
    setShowCustomTypeDialog(false)

    // Generate data to show results
    handleGenerateData()
  }

  const handleRemoveCustomDataType = (id: string) => {
    setConfig({
      ...config,
      customDataTypes: config.customDataTypes.filter((dt) => dt.id !== id),
    })
    setCustomDataTypesList(customDataTypesList.filter((dt) => dt.id !== id))
  }

  const handleMoveField = (id: string, direction: "up" | "down") => {
    const fieldIndex = config.fields.findIndex((field) => field.id === id)
    if (fieldIndex === -1) return

    const newFields = [...config.fields]

    if (direction === "up" && fieldIndex > 0) {
      // Swap with previous field
      ;[newFields[fieldIndex], newFields[fieldIndex - 1]] = [newFields[fieldIndex - 1], newFields[fieldIndex]]
    } else if (direction === "down" && fieldIndex < newFields.length - 1) {
      // Swap with next field
      ;[newFields[fieldIndex], newFields[fieldIndex + 1]] = [newFields[fieldIndex + 1], newFields[fieldIndex]]
    }

    setConfig({
      ...config,
      fields: newFields,
    })
  }

  const handleApplyTemplate = () => {
    if (!selectedTemplate) return

    const template = config.templates?.find((t) => t.id === selectedTemplate)
    if (!template) return

    setConfig({
      ...config,
      fields: [...template.fields],
    })

    setShowTemplateDialog(false)
  }

  const handleExportConfig = () => {
    const exportData = JSON.stringify(config, null, 2)
    const blob = new Blob([exportData], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${config.tableName}_config.${exportFormat}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowExportDialog(false)
  }

  const handleImportConfig = () => {
    try {
      const importedConfig = JSON.parse(importConfig)
      setConfig({
        ...importedConfig,
        // Ensure we have required properties
        rows: importedConfig.rows || 10,
        format: importedConfig.format || "json",
        fields: importedConfig.fields || DEFAULT_FIELDS,
        tableName: importedConfig.tableName || "mock_data",
        customDataTypes: importedConfig.customDataTypes || [],
      })

      // Update the custom data types list
      if (importedConfig.customDataTypes) {
        setCustomDataTypesList(importedConfig.customDataTypes)
      }

      setShowImportDialog(false)
      setImportConfig("")
    } catch (error) {
      console.error("Error importing configuration:", error)
      alert("Invalid configuration format. Please check your JSON.")
    }
  }

  const handlePatternTemplateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value
    setSelectedPatternTemplate(selectedValue)

    if (selectedValue) {
      const template = PATTERN_TEMPLATES.find((t) => t.value === selectedValue)
      if (template) {
        setNewCustomType({
          ...newCustomType,
          pattern: template.value,
        })
      }
    }
  }

  const handleUseCustomDataType = (customType: CustomDataType) => {
    setNewField({
      ...newField,
      type: "custom",
      customName: customType.name,
      columnType: customType.columnType,
      customPattern: customType.pattern,
      customValues: customType.values,
    })
    setShowCustomDataTypesList(false)
  }

  const handleCustomTypeNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    let columnType = newCustomType.columnType

    // Auto-detect type based on name
    if (name.toLowerCase().endsWith("name")) {
      columnType = "string"
    } else if (name.toLowerCase().endsWith("id") || name.toLowerCase().endsWith("number")) {
      // Keep the current type if it's already integer or float
      if (columnType !== "integer" && columnType !== "float") {
        columnType = "integer"
      }
    }

    setNewCustomType({
      ...newCustomType,
      name,
      columnType,
    })
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Fix dark mode toggle - Update the toggleTheme function
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
  }

  const togglePreview = () => {
    setShowPreview(!showPreview)
  }

  // Calculate pagination for preview
  const totalPages = Math.ceil(generatedData.split("\n").length / rowsPerPage)
  const paginatedData = generatedData
    .split("\n")
    .slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage)
    .join("\n")

  // Add function to apply number configuration
  const applyNumberConfiguration = () => {
    if (!currentEditingFieldId) return

    setConfig({
      ...config,
      fields: config.fields.map((field) => {
        if (field.id === currentEditingFieldId) {
          return {
            ...field,
            minValue: numberMin,
            maxValue: numberMax,
            digits: numberDigits,
            generationType: numberGenerationType,
            ...(numberConfigType === "float" || numberConfigType === "double" ? { precision: numberPrecision } : {}),
          }
        }
        return field
      }),
    })

    setShowFieldNumberConfigDialog(false)
    setCurrentEditingFieldId(null)
  }

  return (
    <div className="font-fira-code min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      {/* Date Time Display */}
      <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-3 sticky top-0 z-50 border-b border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            <span className="text-sm font-medium">{currentDateTime}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5 text-amber-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-700" />
              )}
            </button>
            <button
              onClick={() => setShowHelpDialog(true)}
              className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative overflow-hidden py-12 px-4 md:px-6 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-emerald-500/10 dark:from-blue-500/20 dark:to-emerald-500/20"></div>
        <div className="absolute inset-0 bg-grid-slate-200/50 dark:bg-grid-slate-700/20 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

        <div className="relative container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center p-2 mb-4 bg-blue-500/10 dark:bg-blue-500/20 rounded-full">
              <Sparkles className="h-5 w-5 text-blue-500 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Dummi MySQL Data Generator</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 dark:from-blue-400 dark:to-emerald-400">
              Generate Realistic Mock Data
            </h1>
            <p className="text-lg text-slate-700 dark:text-slate-300 max-w-2xl mx-auto">
              Create customizable, realistic test data for development and testing. Export to multiple formats with just
              a few clicks.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-6 pb-16">
        <div className="grid grid-cols-1 gap-6">
          {/* Configuration Panel */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800">
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                <Layers className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                Configuration
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setShowTemplateDialog(true)}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                >
                  <LayoutTemplate className="h-4 w-4" />
                </button>
                <button
                  onClick={togglePreview}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 flex items-center gap-1"
                >
                  {showPreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="hidden md:inline text-sm">{showPreview ? "Hide Preview" : "Show Preview"}</span>
                </button>
              </div>
            </div>

            {showSettings && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="m-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
              >
                <h3 className="text-lg font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
                  <Settings className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                  Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      Font Size
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min="10"
                        max="20"
                        value={settings.fontSize}
                        onChange={(e) => setSettings({ ...settings, fontSize: Number.parseInt(e.target.value) })}
                        className="w-full h-2 bg-slate-200 dark:bg-slate-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                      />
                      <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                        {settings.fontSize}px
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="showLineNumbers"
                      checked={settings.showLineNumbers}
                      onChange={(e) => setSettings({ ...settings, showLineNumbers: e.target.checked })}
                      className="w-4 h-4 text-blue-500 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="showLineNumbers"
                      className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Show Line Numbers
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="compactMode"
                      checked={settings.compactMode}
                      onChange={(e) => setSettings({ ...settings, compactMode: e.target.checked })}
                      className="w-4 h-4 text-blue-500 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor="compactMode"
                      className="ml-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                    >
                      Compact Mode
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                      Theme Colors
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setShowColorPicker(!showColorPicker)}
                        className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1 text-sm"
                      >
                        <Palette className="h-4 w-4" />
                        <span>Colors</span>
                      </button>
                    </div>
                  </div>
                </div>

                {showColorPicker && (
                  <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h4 className="text-sm font-semibold mb-2 text-slate-800 dark:text-slate-200">Color Scheme</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs mb-1 text-slate-600 dark:text-slate-400">Primary Color</label>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600"
                            style={{ backgroundColor: primaryColor }}
                          />
                          <input
                            type="text"
                            value={primaryColor}
                            onChange={(e) => setPrimaryColor(e.target.value)}
                            className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs mb-1 text-slate-600 dark:text-slate-400">Accent Color</label>
                        <div className="flex items-center gap-2">
                          <div
                            className="w-6 h-6 rounded-full border border-slate-300 dark:border-slate-600"
                            style={{ backgroundColor: accentColor }}
                          />
                          <input
                            type="text"
                            value={accentColor}
                            onChange={(e) => setAccentColor(e.target.value)}
                            className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg text-sm"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={() => {
                          document.documentElement.style.setProperty("--primary", primaryColor)
                          document.documentElement.style.setProperty("--accent", accentColor)
                          setShowColorPicker(false)
                        }}
                        className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors flex items-center gap-1 text-sm"
                      >
                        <Check className="h-4 w-4" />
                        Apply Colors
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Number of Rows
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="100000000"
                    value={config.rows}
                    onChange={(e) => setConfig({ ...config, rows: Number.parseInt(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Table Name
                  </label>
                  <input
                    type="text"
                    value={config.tableName}
                    onChange={(e) => setConfig({ ...config, tableName: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Output Format
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {OUTPUT_FORMATS.map((format) => (
                      <button
                        key={format.value}
                        onClick={() => setConfig({ ...config, format: format.value })}
                        className={`px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                          config.format === format.value
                            ? "bg-blue-500 text-white"
                            : "bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                        }`}
                      >
                        <format.icon className="h-4 w-4" />
                        <span>{format.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center text-slate-800 dark:text-slate-100">
                    <Database className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                    Fields
                  </h3>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowCustomDataTypesList(!showCustomDataTypesList)}
                      className="px-3 py-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-sm text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                    >
                      <List className="h-4 w-4" />
                      <span className="hidden sm:inline">Custom Types</span>
                    </button>
                    <button
                      onClick={() => {
                        setNewField({
                          id: uuidv4(),
                          name: "",
                          type: "fullName",
                          columnType: "string",
                        })
                        setShowAddFieldDialog(true)
                      }}
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1 text-sm"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Field</span>
                    </button>
                  </div>
                </div>

                {showCustomDataTypesList && (
                  <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600">
                    <h4 className="text-sm font-semibold mb-2 flex items-center text-slate-800 dark:text-slate-200">
                      <Cpu className="h-4 w-4 mr-1 text-blue-500 dark:text-blue-400" />
                      Available Custom Data Types
                    </h4>
                    {config.customDataTypes.length === 0 ? (
                      <p className="text-sm text-slate-500 dark:text-slate-400">No custom data types defined yet.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                        {config.customDataTypes.map((type) => (
                          <button
                            key={type.id}
                            onClick={() => handleUseCustomDataType(type)}
                            className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-left"
                          >
                            <div className="font-medium text-slate-800 dark:text-slate-200">{type.name}</div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">{type.columnType}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                  {config.fields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 flex flex-col md:flex-row md:items-center gap-3 hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <label className="block text-xs mb-1 text-slate-500 dark:text-slate-400">Field Name</label>
                        <input
                          type="text"
                          value={field.name}
                          onChange={(e) => handleFieldChange(field.id, "name", e.target.value)}
                          className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                        />
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs mb-1 text-slate-500 dark:text-slate-400">Data Type</label>
                        <select
                          value={field.type}
                          onChange={(e) => handleFieldChange(field.id, "type", e.target.value)}
                          className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          style={{
                            backgroundColor: theme === "dark" ? "#1e293b" : "#f8fafc",
                            color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                          }}
                        >
                          {DATA_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                          {config.customDataTypes.map((customType) => (
                            <option key={customType.id} value={`custom:${customType.name}`}>
                              {customType.name} (Custom)
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex-1">
                        <label className="block text-xs mb-1 text-slate-500 dark:text-slate-400">Column Type</label>
                        <div className="flex gap-2">
                          <select
                            value={field.columnType || "string"}
                            onChange={(e) => handleFieldChange(field.id, "columnType", e.target.value)}
                            className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            style={{
                              backgroundColor: theme === "dark" ? "#1e293b" : "#f8fafc",
                              color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                            }}
                          >
                            {COLUMN_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                          {(field.columnType === "integer" ||
                            field.columnType === "float" ||
                            field.columnType === "double") && (
                            <button
                              onClick={() => {
                                setCurrentEditingFieldId(field.id)
                                setNumberConfigType(field.columnType as ColumnType)
                                setNumberMin(field.minValue || 0)
                                setNumberMax(field.maxValue || 1000)
                                setNumberDigits(field.digits || 5)
                                setNumberGenerationType((field.generationType as "sequential" | "random") || "random")
                                if (field.columnType === "float" || field.columnType === "double") {
                                  setNumberPrecision(field.precision || 2)
                                }
                                setShowFieldNumberConfigDialog(true)
                              }}
                              className="p-1 bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50 rounded-lg transition-colors"
                              title="Configure Number Settings"
                            >
                              <Settings className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </button>
                          )}
                        </div>
                        {(field.columnType === "integer" ||
                          field.columnType === "float" ||
                          field.columnType === "double") &&
                          field.minValue !== undefined && (
                            <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-slate-500 dark:text-slate-400">
                              <span>
                                Range: {field.minValue}-{field.maxValue}
                              </span>
                              <span>{field.generationType === "sequential" ? "Sequential" : "Random"}</span>
                              {(field.columnType === "float" || field.columnType === "double") && (
                                <span>Precision: {field.precision || 2}</span>
                              )}
                            </div>
                          )}
                      </div>
                      {field.type === "custom" && (
                        <div className="flex-1">
                          <label className="block text-xs mb-1 text-slate-500 dark:text-slate-400">Custom Name</label>
                          <input
                            type="text"
                            value={field.customName || ""}
                            onChange={(e) => handleFieldChange(field.id, "customName", e.target.value)}
                            className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                          />
                        </div>
                      )}
                      <div className="flex items-center gap-1 self-end md:self-center">
                        <button
                          onClick={() => handleMoveField(field.id, "up")}
                          disabled={index === 0}
                          className="p-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move Up"
                        >
                          <ChevronUp className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </button>
                        <button
                          onClick={() => handleMoveField(field.id, "down")}
                          disabled={index === config.fields.length - 1}
                          className="p-1 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          title="Move Down"
                        >
                          <ChevronDown className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                        </button>
                        <button
                          onClick={() => handleRemoveField(field.id)}
                          className="p-1 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors"
                          title="Remove Field"
                        >
                          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    onClick={() => {
                      setNewField({
                        id: uuidv4(),
                        name: "",
                        type: "fullName",
                        columnType: "string",
                      })
                      setShowAddFieldDialog(true)
                    }}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-2 shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Add Field
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold flex items-center text-slate-800 dark:text-slate-100">
                    <Cpu className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                    Custom Data Types
                  </h3>
                  <button
                    onClick={() => {
                      setNewCustomType({
                        id: uuidv4(),
                        name: "",
                        columnType: "string",
                      })
                      setShowCustomTypeDialog(true)
                    }}
                    className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1 text-sm"
                  >
                    <Plus className="h-4 w-4" />
                    Add Custom Type
                  </button>
                </div>

                {config.customDataTypes.length === 0 ? (
                  <div className="text-center text-slate-500 dark:text-slate-400 my-4 p-6 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <Cpu className="h-10 w-10 mx-auto mb-2 text-slate-400 dark:text-slate-500" />
                    <p className="text-sm">No custom data types defined. Create one to generate specialized data.</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
                    {config.customDataTypes.map((customType, index) => (
                      <motion.div
                        key={customType.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="p-3 bg-white dark:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-600 flex flex-col md:flex-row md:items-center gap-3 hover:shadow-md transition-shadow"
                      >
                        <div className="flex-1">
                          <label className="block text-xs mb-1 text-slate-500 dark:text-slate-400">Type Name</label>
                          <input
                            type="text"
                            value={customType.name}
                            readOnly
                            className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="block text-xs mb-1 text-slate-500 dark:text-slate-400">Column Type</label>
                          <input
                            type="text"
                            value={customType.columnType}
                            readOnly
                            className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg text-sm"
                          />
                        </div>
                        {customType.pattern && (
                          <div className="flex-1">
                            <label className="block text-xs mb-1 text-slate-500 dark:text-slate-400">Pattern</label>
                            <input
                              type="text"
                              value={customType.pattern}
                              readOnly
                              className="w-full px-2 py-1 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg text-sm"
                            />
                          </div>
                        )}
                        <button
                          onClick={() => handleRemoveCustomDataType(customType.id)}
                          className="p-1 bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 rounded-lg transition-colors self-end md:self-center"
                          title="Remove Custom Type"
                        >
                          <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                <button
                  onClick={handleGenerateData}
                  disabled={isGenerating}
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 rounded-lg transition-colors text-white text-lg font-semibold shadow-md flex items-center gap-2 relative overflow-hidden group"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-5 w-5" />
                      Generate Data
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600/20 to-emerald-600/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <Sparkles className="h-5 w-5 mr-2" />
                        Generate Data
                      </span>
                    </>
                  )}
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowExportDialog(true)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                  >
                    <Export className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                  <button
                    onClick={() => setShowImportDialog(true)}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
                  >
                    <Import className="h-4 w-4" />
                    <span>Import</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel - Collapsible */}
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div
              className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-50 to-emerald-50 dark:from-slate-800 dark:to-slate-800 cursor-pointer"
              onClick={togglePreview}
            >
              <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center">
                <Eye className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
                Preview
              </h2>
              <div className="flex flex-wrap gap-2">
                {showPreview && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowPreviewOptions(!showPreviewOptions)
                      }}
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                      title="Preview Options"
                    >
                      <Sliders className="h-4 w-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        handleCopyToClipboard()
                      }}
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 flex items-center gap-2"
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                      <span className="hidden md:inline text-sm">{copied ? "Copied!" : "Copy"}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowDownloadDialog(true)
                      }}
                      className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden md:inline text-sm">Download</span>
                    </button>
                  </>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    togglePreview()
                  }}
                  className="p-2 rounded-lg bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors shadow-sm border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200"
                >
                  {showPreview ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className={`preview-transition ${showPreview ? "preview-expanded" : "preview-collapsed"}`}>
              {showPreviewOptions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="m-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg border border-slate-200 dark:border-slate-600"
                >
                  <div className="flex flex-wrap gap-3 justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div>
                        <label className="block text-xs mb-1 text-slate-600 dark:text-slate-400">Format</label>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setPreviewFormat("raw")}
                            className={`px-2 py-1 rounded-lg text-xs ${
                              previewFormat === "raw"
                                ? "bg-blue-500 text-white"
                                : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            Raw
                          </button>
                          <button
                            onClick={() => setPreviewFormat("formatted")}
                            className={`px-2 py-1 rounded-lg text-xs ${
                              previewFormat === "formatted"
                                ? "bg-blue-500 text-white"
                                : "bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            Formatted
                          </button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs mb-1 text-slate-600 dark:text-slate-400">Rows per page</label>
                        <select
                          value={rowsPerPage}
                          onChange={(e) => setRowsPerPage(Number.parseInt(e.target.value))}
                          className="px-2 py-1 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg text-xs"
                          style={{
                            backgroundColor: theme === "dark" ? "#334155" : "#ffffff",
                            color: theme === "dark" ? "#e2e8f0" : "#334155",
                          }}
                        >
                          <option value="10">10</option>
                          <option value="25">25</option>
                          <option value="50">50</option>
                          <option value="100">100</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="p-1 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <span className="text-xs text-slate-700 dark:text-slate-300">
                        Page {currentPage} of {totalPages || 1}
                      </span>
                      <button
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage >= totalPages}
                        className="p-1 bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div
                ref={previewRef}
                className="m-4 bg-slate-50 dark:bg-slate-900 rounded-lg p-4 overflow-auto max-h-[500px] font-fira-code text-sm scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent border border-slate-200 dark:border-slate-700"
                style={{ fontSize: `${settings.fontSize}px` }}
              >
                <pre className="whitespace-pre-wrap text-slate-800 dark:text-slate-200">
                  {previewFormat === "raw" ? generatedData : paginatedData}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Field Dialog */}
      {showAddFieldDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col max-h-[90vh]"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
              <Plus className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Add New Field
            </h3>
            <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent flex-1">
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Field Name</label>
                <input
                  type="text"
                  value={newField.name}
                  onChange={(e) => setNewField({ ...newField, name: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. user_id"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Data Type</label>
                <select
                  value={newField.type}
                  onChange={(e) => setNewField({ ...newField, type: e.target.value as DataType })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{
                    backgroundColor: theme === "dark" ? "#334155" : "#f8fafc",
                    color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                  }}
                >
                  {DATA_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Column Type</label>
                <select
                  value={newField.columnType || "string"}
                  onChange={(e) => setNewField({ ...newField, columnType: e.target.value as ColumnType })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  style={{
                    backgroundColor: theme === "dark" ? "#334155" : "#f8fafc",
                    color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                  }}
                >
                  {COLUMN_TYPES.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>
              {newField.type === "custom" && (
                <>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      Custom Name
                    </label>
                    <input
                      type="text"
                      value={newField.customName || ""}
                      onChange={(e) => setNewField({ ...newField, customName: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Custom field name"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      Pattern (optional)
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={newField.customPattern || ""}
                        onChange={(e) => setNewField({ ...newField, customPattern: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. [A-Z]{3}-[0-9]{4}"
                      />
                    </div>
                    <select
                      value={selectedPatternTemplate}
                      onChange={handlePatternTemplateChange}
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      style={{
                        backgroundColor: theme === "dark" ? "#334155" : "#f8fafc",
                        color: theme === "dark" ? "#e2e8f0" : "#1e293b",
                      }}
                    >
                      <option value="">-- Select Pattern Template --</option>
                      {PATTERN_TEMPLATES.map((template, index) => (
                        <option key={index} value={template.value}>
                          {template.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                      Custom Values (optional, comma-separated)
                    </label>
                    <textarea
                      value={newField.customValues?.join(", ") || ""}
                      onChange={(e) =>
                        setNewField({
                          ...newField,
                          customValues: e.target.value
                            .split(",")
                            .map((v) => v.trim())
                            .filter((v) => v),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-20"
                      placeholder="e.g. Value1, Value2, Value3"
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="addToCustomTypes"
                      checked={addToCustomTypes}
                      onChange={(e) => setAddToCustomTypes(e.target.checked)}
                      className="w-4 h-4 text-blue-500 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="addToCustomTypes" className="ml-2 text-sm text-slate-700 dark:text-slate-300">
                      Add to custom data types list for reuse
                    </label>
                  </div>
                </>
              )}
            </div>
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 sticky bottom-0 bg-white dark:bg-slate-800">
              <button
                onClick={() => setShowAddFieldDialog(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleAddField}
                disabled={!newField.name}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Add Field
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Custom Data Type Dialog */}
      {showCustomTypeDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-xl flex flex-col max-h-[90vh]"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
              <Cpu className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Add Custom Data Type
            </h3>
            <div className="space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent flex-1">
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Type Name</label>
                <input
                  type="text"
                  value={newCustomType.name}
                  onChange={handleCustomTypeNameChange}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. ProductCode (ends with 'name' for string, 'id'/'number' for numeric)"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Tip: Names ending with "name" will use string format, "id" or "number" will use numeric format
                </p>
              </div>

              {/* Keep the rest of the form fields as they are */}

              {/* ... existing form fields ... */}
            </div>
            <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-slate-200 dark:border-slate-700 sticky bottom-0 bg-white dark:bg-slate-800">
              <button
                onClick={() => setShowCustomTypeDialog(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleAddCustomDataType}
                disabled={!newCustomType.name}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Add Custom Type
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Download Dialog */}
      {showDownloadDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
              <Download className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Download File
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Filename</label>
                <input
                  type="text"
                  value={downloadFilename}
                  onChange={(e) => setDownloadFilename(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder={filename}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {EXPORT_FORMATS.map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setDownloadFormat(format.value)}
                      className={`px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        downloadFormat === format.value
                          ? "bg-blue-500 text-white"
                          : "bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                      }`}
                    >
                      <format.icon className="h-4 w-4" />
                      <span>{format.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowDownloadDialog(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
              >
                <FileDown className="h-4 w-4" />
                Download
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Template Dialog */}
      {showTemplateDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
              <LayoutTemplate className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Schema Templates
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
              {config.templates?.map((template) => (
                <div
                  key={template.id}
                  className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                    selectedTemplate === template.id
                      ? "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                      : "bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600"
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-slate-800 dark:text-slate-200">{template.name}</h4>
                    {selectedTemplate === template.id && <Check className="h-4 w-4 text-blue-500 dark:text-blue-400" />}
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{template.description}</p>
                  <div className="mt-2 text-xs text-slate-400 dark:text-slate-500">{template.fields.length} fields</div>
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowTemplateDialog(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleApplyTemplate}
                disabled={!selectedTemplate}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Apply Template
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Export Dialog */}
      {showExportDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
              <Export className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Export Configuration
            </h3>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400">
                Export your current configuration to a file that you can import later or share with others.
              </p>
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Format</label>
                <div className="grid grid-cols-2 gap-2">
                  {EXPORT_FORMATS.slice(0, 4).map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setExportFormat(format.value)}
                      className={`px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        exportFormat === format.value
                          ? "bg-blue-500 text-white"
                          : "bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                      }`}
                    >
                      <format.icon className="h-4 w-4" />
                      <span>{format.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowExportDialog(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleExportConfig}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
              >
                <FileDown className="h-4 w-4" />
                Export
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Import Dialog */}
      {showImportDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
              <Import className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Import Configuration
            </h3>
            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Paste a previously exported configuration to restore your settings.
              </p>
              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">Format</label>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {EXPORT_FORMATS.slice(0, 4).map((format) => (
                    <button
                      key={format.value}
                      onClick={() => setImportFormat(format.value)}
                      className={`px-3 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                        importFormat === format.value
                          ? "bg-blue-500 text-white"
                          : "bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-600"
                      }`}
                    >
                      <format.icon className="h-4 w-4" />
                      <span>{format.label}</span>
                    </button>
                  ))}
                </div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Configuration Data
                </label>
                <textarea
                  value={importConfig}
                  onChange={(e) => setImportConfig(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 h-40 font-fira-code text-sm"
                  placeholder='{"rows": 10, "format": "json", "fields": [...], ...}'
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowImportDialog(false)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={handleImportConfig}
                disabled={!importConfig}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Import
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Help Dialog */}
      {showHelpDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-2xl w-full border border-slate-200 dark:border-slate-700 shadow-xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
              <HelpCircle className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              Help & Documentation
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-medium mb-2 text-slate-800 dark:text-slate-200">Getting Started</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  The Dummi MySQL Data Generator helps you create realistic test data for development and testing
                  purposes. Follow these steps to generate your data:
                </p>
                <ol className="mt-2 space-y-2 text-slate-600 dark:text-slate-400 list-decimal list-inside">
                  <li>Configure your fields using the Fields section</li>
                  <li>Set the number of rows you want to generate</li>
                  <li>Choose your preferred output format (JSON, CSV, SQL, HTML)</li>
                  <li>Click the "Generate Data" button to create your data</li>
                  <li>Preview, copy, or download your generated data</li>
                </ol>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2 text-slate-800 dark:text-slate-200">Custom Data Types</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Create custom data types for specialized data generation needs:
                </p>
                <ul className="mt-2 space-y-2 text-slate-600 dark:text-slate-400 list-disc list-inside">
                  <li>Click "Add Custom Type" to create a new data type</li>
                  <li>Names ending with "name" will automatically use string format</li>
                  <li>Names ending with "id" or "number" will use numeric format</li>
                  <li>Configure numeric options like digits, min/max values, and precision</li>
                  <li>Add patterns, custom values, and formatting options as needed</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2 text-slate-800 dark:text-slate-200">Templates</h4>
                <p className="text-slate-600 dark:text-slate-400">
                  Use pre-defined templates to quickly set up common data structures:
                </p>
                <ul className="mt-2 space-y-2 text-slate-600 dark:text-slate-400 list-disc list-inside">
                  <li>Click the Templates button in the configuration panel</li>
                  <li>Select a template from the list</li>
                  <li>Click "Apply Template" to use the selected template</li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-medium mb-2 text-slate-800 dark:text-slate-200">Export & Import</h4>
                <p className="text-slate-600 dark:text-slate-400">Save and reuse your configurations:</p>
                <ul className="mt-2 space-y-2 text-slate-600 dark:text-slate-400 list-disc list-inside">
                  <li>Click "Export" to save your current configuration as JSON</li>
                  <li>Click "Import" to load a previously saved configuration</li>
                  <li>Click "Download" to save your generated data in your chosen format</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowHelpDialog(false)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Got it
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Number Configuration Dialog */}
      {showFieldNumberConfigDialog && (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-800 rounded-xl p-6 max-w-md w-full border border-slate-200 dark:border-slate-700 shadow-xl"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800 dark:text-slate-100">
              <Settings className="h-5 w-5 mr-2 text-blue-500 dark:text-blue-400" />
              {numberConfigType.charAt(0).toUpperCase() + numberConfigType.slice(1)} Configuration
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Minimum Value
                  </label>
                  <input
                    type="number"
                    value={numberMin}
                    onChange={(e) => setNumberMin(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Maximum Value
                  </label>
                  <input
                    type="number"
                    value={numberMax}
                    onChange={(e) => setNumberMax(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Number of Digits
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={numberDigits}
                  onChange={(e) => setNumberDigits(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Maximum number of digits to display</p>
              </div>

              {(numberConfigType === "float" || numberConfigType === "double") && (
                <div>
                  <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                    Decimal Precision
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="10"
                    value={numberPrecision}
                    onChange={(e) => setNumberPrecision(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Number of decimal places</p>
                </div>
              )}

              <div>
                <label className="block mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
                  Generation Type
                </label>
                <div className="flex gap-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="generationType"
                      checked={numberGenerationType === "sequential"}
                      onChange={() => setNumberGenerationType("sequential")}
                      className="w-4 h-4 text-blue-500 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Sequential</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="generationType"
                      checked={numberGenerationType === "random"}
                      onChange={() => setNumberGenerationType("random")}
                      className="w-4 h-4 text-blue-500 bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-slate-700 dark:text-slate-300">Random</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowFieldNumberConfigDialog(false)
                  setCurrentEditingFieldId(null)
                }}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors flex items-center gap-1 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
              <button
                onClick={applyNumberConfiguration}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center gap-1"
              >
                <Check className="h-4 w-4" />
                Apply
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-all z-50 animate-bounce"
          aria-label="Back to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </div>
  )
}
