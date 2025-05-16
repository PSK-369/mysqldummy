"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sparkles, Database, ArrowRight, Check, Copy } from "lucide-react"

export default function TestDataGeneration() {
  const [dataType, setDataType] = useState("users")
  const [rowCount, setRowCount] = useState("10")
  const [generatedData, setGeneratedData] = useState<any[]>([])
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const generateData = () => {
    setIsGenerating(true)
    setTimeout(() => {
      const count = Number.parseInt(rowCount, 10)
      const data = []

      if (dataType === "users") {
        for (let i = 0; i < count; i++) {
          data.push({
            id: i + 1,
            username: `user${i + 1}`,
            email: `user${i + 1}@example.com`,
            created_at: new Date().toISOString(),
          })
        }
      } else if (dataType === "products") {
        for (let i = 0; i < count; i++) {
          data.push({
            id: i + 1,
            name: `Product ${i + 1}`,
            price: (Math.random() * 100).toFixed(2),
            category: ["Electronics", "Clothing", "Food", "Books"][Math.floor(Math.random() * 4)],
          })
        }
      } else if (dataType === "orders") {
        for (let i = 0; i < count; i++) {
          data.push({
            id: i + 1,
            user_id: Math.floor(Math.random() * 100) + 1,
            total: (Math.random() * 500).toFixed(2),
            status: ["pending", "completed", "shipped", "cancelled"][Math.floor(Math.random() * 4)],
          })
        }
      }

      setGeneratedData(data)
      setIsGenerating(false)
    }, 800)
  }

  const copyToClipboard = (format: "sql" | "json") => {
    let content = ""

    if (format === "sql") {
      if (dataType === "users") {
        content = `CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, username, email, created_at) VALUES
${generatedData.map((row) => `(${row.id}, '${row.username}', '${row.email}', '${row.created_at}')`).join(",\n")};`
      } else if (dataType === "products") {
        content = `CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50)
);

INSERT INTO products (id, name, price, category) VALUES
${generatedData.map((row) => `(${row.id}, '${row.name}', ${row.price}, '${row.category}')`).join(",\n")};`
      } else if (dataType === "orders") {
        content = `CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (id, user_id, total, status) VALUES
${generatedData.map((row) => `(${row.id}, ${row.user_id}, ${row.total}, '${row.status}')`).join(",\n")};`
      }
    } else if (format === "json") {
      content = JSON.stringify(generatedData, null, 2)
    }

    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-2 border-purple-700/50 rounded-xl shadow-xl dark:from-gray-900 dark:to-gray-800 dark:border-gray-700">
      <CardHeader className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white rounded-t-xl dark:from-gray-800 dark:to-gray-700">
        <div className="flex items-center gap-3">
          <Database className="h-6 w-6 text-purple-300" />
          <div>
            <CardTitle className="text-xl font-bold">Test Data Generator</CardTitle>
            <CardDescription className="text-purple-200">Quickly generate sample data for testing</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dataType" className="text-purple-200">
                Data Type
              </Label>
              <Select value={dataType} onValueChange={setDataType}>
                <SelectTrigger
                  id="dataType"
                  className="border-purple-500/30 dark:border-gray-600 bg-white/10 text-purple-200"
                >
                  <SelectValue placeholder="Select data type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="users">Users</SelectItem>
                  <SelectItem value="products">Products</SelectItem>
                  <SelectItem value="orders">Orders</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="rowCount" className="text-purple-200">
                Number of Rows
              </Label>
              <Input
                id="rowCount"
                type="number"
                value={rowCount}
                onChange={(e) => setRowCount(e.target.value)}
                min="1"
                max="100"
                className="border-purple-500/30 dark:border-gray-600 bg-white/10 text-purple-200"
              />
            </div>
            <Button
              onClick={generateData}
              disabled={isGenerating}
              className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 relative overflow-hidden group"
            >
              {isGenerating ? (
                <>
                  <span className="opacity-0">Generate Data</span>
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  </span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-[360deg] transition-transform duration-500" />
                  Generate Data
                  <span className="absolute inset-0 w-full h-full bg-black/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate Data
                  </span>
                </>
              )}
            </Button>
          </div>

          <div className="md:col-span-2">
            {generatedData.length > 0 ? (
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid grid-cols-2 bg-purple-800/50 dark:bg-gray-700">
                  <TabsTrigger
                    value="preview"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    Preview
                  </TabsTrigger>
                  <TabsTrigger
                    value="code"
                    className="data-[state=active]:bg-purple-600 data-[state=active]:text-white"
                  >
                    SQL Code
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="rounded-lg border border-purple-500/30 dark:border-gray-700 overflow-hidden">
                    <div className="max-h-[300px] overflow-auto">
                      <Table>
                        <TableHeader className="bg-purple-900/50 dark:bg-gray-700">
                          <TableRow>
                            {Object.keys(generatedData[0]).map((key) => (
                              <TableHead key={key} className="text-purple-200 dark:text-purple-300 whitespace-nowrap">
                                {key}
                              </TableHead>
                            ))}
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {generatedData.map((row, i) => (
                            <TableRow key={i} className="hover:bg-purple-800/20 dark:hover:bg-gray-800">
                              {Object.values(row).map((value: any, j) => (
                                <TableCell key={j} className="whitespace-nowrap text-purple-200 dark:text-gray-300">
                                  {value}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard("json")}
                      className="border-purple-500/30 dark:border-gray-600 text-purple-200 dark:text-gray-300"
                    >
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copy JSON
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="code" className="mt-4">
                  <div className="rounded-lg border border-purple-500/30 dark:border-gray-700 overflow-hidden bg-purple-900/30 dark:bg-gray-800/50 p-4">
                    <pre className="text-purple-200 dark:text-gray-300 text-sm overflow-auto max-h-[300px]">
                      {dataType === "users" &&
                        `CREATE TABLE users (
  id INT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, username, email, created_at) VALUES
${generatedData.map((row) => `(${row.id}, '${row.username}', '${row.email}', '${row.created_at}')`).join(",\n")};`}
                      {dataType === "products" &&
                        `CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category VARCHAR(50)
);

INSERT INTO products (id, name, price, category) VALUES
${generatedData.map((row) => `(${row.id}, '${row.name}', ${row.price}, '${row.category}')`).join(",\n")};`}
                      {dataType === "orders" &&
                        `CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO orders (id, user_id, total, status) VALUES
${generatedData.map((row) => `(${row.id}, ${row.user_id}, ${row.total}, '${row.status}')`).join(",\n")};`}
                    </pre>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      variant="outline"
                      onClick={() => copyToClipboard("sql")}
                      className="border-purple-500/30 dark:border-gray-600 text-purple-200 dark:text-gray-300"
                    >
                      {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                      Copy SQL
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="h-16 w-16 text-purple-500/50 mb-4" />
                  <h3 className="text-lg font-medium text-purple-300 mb-2">Generate Test Data</h3>
                  <p className="text-purple-200/70 max-w-md mb-6">
                    Select a data type and number of rows, then click "Generate Data" to create sample data for testing.
                  </p>
                  <div className="flex items-center justify-center text-purple-300/50">
                    <ArrowRight className="h-5 w-5 animate-pulse" />
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-purple-900/50 dark:bg-gray-800/50 rounded-b-xl p-4">
        <p className="text-sm text-purple-300/70 dark:text-gray-400">
          Use this test data for quick MySQL practice and development. For more complex data, use the main generator
          above.
        </p>
      </CardFooter>
    </Card>
  )
}
