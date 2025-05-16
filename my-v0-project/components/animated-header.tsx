"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useVisitorCounter } from "@/hooks/use-visitor-counter"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function AnimatedHeader() {
  const { count } = useVisitorCounter()
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="relative w-full overflow-hidden py-10">
      <div className="absolute inset-0 animated-gradient-bg opacity-10"></div>
      <motion.div
        className="container relative z-10 mx-auto flex flex-col items-center justify-center px-4 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div className="mb-2 flex items-center justify-center gap-2" variants={item}>
          <div className="relative h-12 w-12 overflow-hidden rounded-full bg-primary/20 p-2">
            <div className="absolute inset-0 animated-gradient-bg opacity-30"></div>
            <svg className="h-full w-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path d="M2 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path
                d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <motion.h1 className="text-4xl font-bold tracking-tight md:text-5xl" variants={item}>
            Dummi MySQL Data Generator
          </motion.h1>
        </motion.div>

        <motion.p className="mb-6 max-w-2xl text-lg text-muted-foreground" variants={item}>
          Generate realistic mock data for your development and testing needs. Customize fields, formats, and export
          options to suit your project requirements.
        </motion.p>

        <motion.div className="flex items-center gap-4" variants={item}>
          {mounted && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full transition-all hover:bg-primary hover:text-primary-foreground"
            >
              {theme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}
          <div className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">{count} visitors have used this tool</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
