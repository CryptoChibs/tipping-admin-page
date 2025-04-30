"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "@/components/sidebar"
import SmartTagDashboard from "@/components/smart-tag-dashboard"

export default function CommandCenter() {
  const router = useRouter()
  const [isInstalled, setIsInstalled] = useState(false)

  // Check if SmartTag is installed on component mount
  useEffect(() => {
    const installed = localStorage.getItem("smartTagInstalled") === "true"
    setIsInstalled(installed)

    // If not installed, redirect to home page
    if (!installed) {
      router.push("/")
    }
  }, [router])

  // If not installed, don't render the page
  if (!isInstalled) {
    return null
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1f22]">
      {/* Top Banner */}
      <div className="bg-[#f8d568] text-black py-2 px-4 flex justify-between items-center">
        <div>
          Collab.Land <span className="underline font-medium">Subscriptions</span> are here — make your choice today!
        </div>
        <button className="hover:bg-[#e5c45e] rounded-sm p-1">
          <span className="text-xl">&times;</span>
        </button>
      </div>

      {/* DeFi Guide Banner */}
      <div className="bg-[#cce5ff] text-black py-2 px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#5865f2] rounded-full w-6 h-6 flex items-center justify-center">
            <img
              src="/placeholder.svg?height=20&width=20"
              width={20}
              height={20}
              alt="Cipher Counts logo"
              className="rounded-full"
            />
          </div>
          <span>Check out this free DeFi survival guide, </span>
          <span>courtesy of your accounting friends at Cipher Counts</span>
        </div>
        <button className="hover:bg-[#b8daff] rounded-sm p-1">
          <span className="text-xl">&times;</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-white mb-6">Community Tipping</h1>
            <SmartTagDashboard />
          </div>
        </div>
      </div>
    </div>
  )
} 