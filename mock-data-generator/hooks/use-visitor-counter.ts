"use client"

import { useState, useEffect } from "react"

export function useVisitorCounter() {
  const [visitors, setVisitors] = useState(0)
  const [downloads, setDownloads] = useState(0)

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demo purposes, we'll use localStorage and random numbers
    const storedVisitors = localStorage.getItem("visitors")
    const storedDownloads = localStorage.getItem("downloads")

    if (storedVisitors) {
      setVisitors(Number.parseInt(storedVisitors, 10))
    } else {
      // Generate a random number between 5000 and 15000
      const randomVisitors = Math.floor(Math.random() * 10000) + 5000
      setVisitors(randomVisitors)
      localStorage.setItem("visitors", randomVisitors.toString())
    }

    if (storedDownloads) {
      setDownloads(Number.parseInt(storedDownloads, 10))
    } else {
      // Generate a random number between 1000 and 5000
      const randomDownloads = Math.floor(Math.random() * 4000) + 1000
      setDownloads(randomDownloads)
      localStorage.setItem("downloads", randomDownloads.toString())
    }
  }, [])

  const incrementDownloads = () => {
    const newDownloads = downloads + 1
    setDownloads(newDownloads)
    localStorage.setItem("downloads", newDownloads.toString())
  }

  return { visitors, downloads, incrementDownloads }
}
