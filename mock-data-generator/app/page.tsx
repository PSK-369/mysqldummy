import type { Metadata } from "next"
import DataGenerator from "@/components/data-generator"
import TestDataGeneration from "@/components/test-data-generation"

export const metadata: Metadata = {
  title: "Dummi MySQL Data Generator",
  description:
    "Generate realistic mock data for MySQL practice and development. Features customizable fields, multiple export formats, and Cascadia Mono SemiBold font.",
}

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <DataGenerator />

        {/* Test Data Generation Section */}
        <div className="mt-12">
          <TestDataGeneration />
        </div>
      </div>
    </main>
  )
}
