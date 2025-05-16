"use client"

import { useState } from "react"
import { HelpCircle, Lightbulb, Sparkles } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function HelpDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:bg-white/20 dark:hover:bg-gray-700"
        >
          <HelpCircle className="h-5 w-5 text-purple-300 dark:text-purple-400" />
          <span className="sr-only">Help</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-2 border-purple-500/30 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800">
        <DialogHeader>
          <DialogTitle className="text-purple-200">Data Generator Help</DialogTitle>
          <DialogDescription className="text-purple-300/70">
            Learn how to use the Dummi MySQL Data Generator effectively
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="field-patterns">
          <TabsList className="grid grid-cols-3 bg-purple-800/50 dark:bg-gray-700">
            <TabsTrigger
              value="field-patterns"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Field Patterns
            </TabsTrigger>
            <TabsTrigger
              value="custom-types"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              Custom Types
            </TabsTrigger>
            <TabsTrigger
              value="id-settings"
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              ID Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="field-patterns" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-purple-200 dark:text-purple-300 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Field Name Pattern Recognition
            </h3>
            <p className="text-sm text-purple-300/70">
              The generator can automatically detect patterns in field names and generate appropriate data. This feature
              is especially useful for custom fields.
            </p>

            <div className="bg-purple-800/30 dark:bg-black/30 p-4 rounded-lg space-y-2 border border-purple-500/20">
              <h4 className="font-medium text-purple-200 dark:text-purple-300">Name Fields</h4>
              <ul className="text-sm space-y-1 list-disc pl-5 font-semibold text-purple-300/70">
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">employee_name</code> → Full names (e.g., "John
                  Smith")
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">first_name</code> → First names only (e.g.,
                  "John")
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">last_name</code> → Last names only (e.g.,
                  "Smith")
                </li>
              </ul>
            </div>

            <div className="bg-purple-800/30 dark:bg-black/30 p-4 rounded-lg space-y-2 border border-purple-500/20">
              <h4 className="font-medium text-purple-200 dark:text-purple-300">ID Fields</h4>
              <ul className="text-sm space-y-1 list-disc pl-5 font-semibold text-purple-300/70">
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">user_id</code> → ID values with configurable
                  length
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">product_id</code> → ID values with configurable
                  length
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">order_id</code> → ID values with configurable
                  length
                </li>
              </ul>
            </div>

            <div className="bg-purple-800/30 dark:bg-black/30 p-4 rounded-lg space-y-2 border border-purple-500/20">
              <h4 className="font-medium text-purple-200 dark:text-purple-300">Other Common Patterns</h4>
              <ul className="text-sm space-y-1 list-disc pl-5 font-semibold text-purple-300/70">
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">email</code> → Email addresses
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">phone</code> → Phone numbers
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">address</code> → Street addresses
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">city</code> → City names
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">country</code> → Country names
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">zip_code</code> → Zip codes
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">price</code> or{" "}
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">cost</code> → Decimal values
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">quantity</code> or{" "}
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">count</code> → Integer values
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">description</code> → Text content
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">color</code> → Color names
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">gender</code> → Gender values
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">date</code> → Date values
                </li>
                <li>
                  <code className="bg-purple-900/50 px-1 py-0.5 rounded">time</code> → Time values
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="custom-types" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-purple-200 dark:text-purple-300 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-purple-400" />
              Custom Data Types
            </h3>
            <p className="text-sm text-purple-300/70">
              You can create custom data types for specific needs and save them for reuse.
            </p>

            <div className="bg-purple-800/30 dark:bg-black/30 p-4 rounded-lg space-y-2 border border-purple-500/20">
              <h4 className="font-medium text-purple-200 dark:text-purple-300">Creating Custom Types</h4>
              <ol className="text-sm space-y-1 list-decimal pl-5 font-semibold text-purple-300/70">
                <li>Select "Custom" from the data type dropdown</li>
                <li>Enter a name for your custom type</li>
                <li>Select the data format (string, int, float, text)</li>
                <li>Choose whether to add it to the data types list for reuse</li>
                <li>Configure additional options in the field settings</li>
              </ol>
            </div>

            <div className="bg-purple-800/30 dark:bg-black/30 p-4 rounded-lg space-y-2 border border-purple-500/20">
              <h4 className="font-medium text-purple-200 dark:text-purple-300">Custom Type Options</h4>
              <ul className="text-sm space-y-1 list-disc pl-5 font-semibold text-purple-300/70">
                <li>
                  <strong className="text-purple-200">Subtype:</strong> Choose from predefined subtypes like fullName,
                  email, etc.
                </li>
                <li>
                  <strong className="text-purple-200">Custom Values:</strong> Provide a comma-separated list of values
                  to choose from
                </li>
                <li>
                  <strong className="text-purple-200">Custom Pattern:</strong> Define a pattern using # (digits), ?
                  (letters), * (alphanumeric)
                </li>
                <li>
                  <strong className="text-purple-200">Numeric:</strong> Configure digits and precision for numeric types
                </li>
                <li>
                  <strong className="text-purple-200">NULL Values:</strong> Allow NULL values with a configurable
                  percentage
                </li>
                <li>
                  <strong className="text-purple-200">Duplicates:</strong> Allow duplicate values with a configurable
                  percentage
                </li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="id-settings" className="space-y-4 mt-4">
            <h3 className="text-lg font-semibold text-purple-200 dark:text-purple-300 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              ID Field Settings
            </h3>
            <p className="text-sm text-purple-300/70">
              ID fields have special configuration options to generate structured identifiers.
            </p>

            <div className="bg-purple-800/30 dark:bg-black/30 p-4 rounded-lg space-y-2 border border-purple-500/20">
              <h4 className="font-medium text-purple-200 dark:text-purple-300">ID Length</h4>
              <p className="text-sm font-semibold text-purple-300/70">
                Set the number of digits in the ID. For example, with length 4:
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5 font-semibold text-purple-300/70">
                <li>0001, 0002, 0003, etc.</li>
              </ul>
            </div>

            <div className="bg-purple-800/30 dark:bg-black/30 p-4 rounded-lg space-y-2 border border-purple-500/20">
              <h4 className="font-medium text-purple-200 dark:text-purple-300">Prefix and Suffix</h4>
              <p className="text-sm font-semibold text-purple-300/70">Add fixed text before or after the ID number:</p>
              <ul className="text-sm space-y-1 list-disc pl-5 font-semibold text-purple-300/70">
                <li>Prefix "PROD-" → PROD-0001, PROD-0002, etc.</li>
                <li>Suffix "-A" → 0001-A, 0002-A, etc.</li>
                <li>Both → PROD-0001-A, PROD-0002-A, etc.</li>
              </ul>
            </div>

            <div className="bg-purple-800/30 dark:bg-black/30 p-4 rounded-lg space-y-2 border border-purple-500/20">
              <h4 className="font-medium text-purple-200 dark:text-purple-300">Random Prefix/Suffix</h4>
              <p className="text-sm font-semibold text-purple-300/70">
                Use random prefixes or suffixes from a predefined list:
              </p>
              <ul className="text-sm space-y-1 list-disc pl-5 font-semibold text-purple-300/70">
                <li>Random prefix → USR-0001, PROD-0002, ORD-0003, etc.</li>
                <li>Random suffix → 0001-A, 0002-B, 0003-X, etc.</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
