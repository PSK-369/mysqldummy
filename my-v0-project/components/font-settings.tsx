"use client"

import { useState } from "react"
import { Type } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface FontSettingsProps {
  onFontSizeChange: (size: number) => void
}

export default function FontSettings({ onFontSizeChange }: FontSettingsProps) {
  const [open, setOpen] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState("semibold")

  const handleFontSizeChange = (value: number[]) => {
    setFontSize(value[0])
    onFontSizeChange(value[0])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-white hover:bg-white/20 dark:hover:bg-gray-700"
        >
          <Type className="h-5 w-5 text-purple-300 dark:text-purple-400" />
          <span className="sr-only">Font Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-purple-900/90 to-indigo-900/90 border-2 border-purple-500/30 dark:border-gray-700 dark:from-gray-900 dark:to-gray-800">
        <DialogHeader>
          <DialogTitle className="text-purple-200">Font Settings</DialogTitle>
          <DialogDescription className="text-purple-300/70">
            Customize the font appearance to your preference
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <Label className="text-purple-200">Font Size: {fontSize}px</Label>
            <Slider value={[fontSize]} min={12} max={24} step={1} onValueChange={handleFontSizeChange} />
            <div className="grid grid-cols-3 gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFontSizeChange([14])}
                className="h-8 border-purple-500/30 text-purple-200"
              >
                Small
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFontSizeChange([16])}
                className="h-8 border-purple-500/30 text-purple-200"
              >
                Medium
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleFontSizeChange([20])}
                className="h-8 border-purple-500/30 text-purple-200"
              >
                Large
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-purple-200">Font Weight</Label>
            <RadioGroup value={fontWeight} onValueChange={setFontWeight} className="grid grid-cols-2 gap-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="regular" id="regular" className="text-purple-600 border-purple-500" />
                <Label htmlFor="regular" className="text-purple-200">
                  Regular
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" className="text-purple-600 border-purple-500" />
                <Label htmlFor="medium" className="text-purple-200">
                  Medium
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="semibold" id="semibold" className="text-purple-600 border-purple-500" />
                <Label htmlFor="semibold" className="text-purple-200">
                  SemiBold
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bold" id="bold" className="text-purple-600 border-purple-500" />
                <Label htmlFor="bold" className="text-purple-200">
                  Bold
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="p-4 bg-purple-800/30 dark:bg-gray-700/50 rounded-lg border border-purple-500/20">
            <p className="text-center text-purple-200 font-mono" style={{ fontSize: `${fontSize}px` }}>
              Cascadia Mono SemiBold
            </p>
            <p className="text-center text-purple-300/70 text-sm mt-2">Optimized for code and data display</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
