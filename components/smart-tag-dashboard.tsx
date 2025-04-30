"use client"

import { Info, X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar"

// Mock data for wallet configuration history
const mockHistory = [
  {
    username: "gap8880",
    discordId: "123456789012345678",
    wallet: "0x1234567890123456789012345678901234567890",
    timestamp: "2024-03-20 14:30:45"
  },
  {
    username: "cwispychibi",
    discordId: "876543210987654321",
    wallet: "0x8765432109876543210987654321098765432109",
    timestamp: "2024-03-19 09:15:22"
  },
  {
    username: "damaderoca",
    discordId: "246813579024681357",
    wallet: "0x2468135790246813579024681357902468135790",
    timestamp: "2024-03-18 16:45:33"
  },
  // Add more mock entries to demonstrate pagination
  {
    username: "gap8880",
    discordId: "123456789012345678",
    wallet: "0x1234567890123456789012345678901234567890",
    timestamp: "2024-03-17 14:30:45"
  },
  {
    username: "cwispychibi",
    discordId: "876543210987654321",
    wallet: "0x8765432109876543210987654321098765432109",
    timestamp: "2024-03-16 09:15:22"
  },
  {
    username: "damaderoca",
    discordId: "246813579024681357",
    wallet: "0x2468135790246813579024681357902468135790",
    timestamp: "2024-03-15 16:45:33"
  },
  {
    username: "gap8880",
    discordId: "123456789012345678",
    wallet: "0x1234567890123456789012345678901234567890",
    timestamp: "2024-03-14 14:30:45"
  },
  {
    username: "cwispychibi",
    discordId: "876543210987654321",
    wallet: "0x8765432109876543210987654321098765432109",
    timestamp: "2024-03-13 09:15:22"
  },
  {
    username: "damaderoca",
    discordId: "246813579024681357",
    wallet: "0x2468135790246813579024681357902468135790",
    timestamp: "2024-03-12 16:45:33"
  },
  {
    username: "gap8880",
    discordId: "123456789012345678",
    wallet: "0x1234567890123456789012345678901234567890",
    timestamp: "2024-03-11 14:30:45"
  },
  {
    username: "cwispychibi",
    discordId: "876543210987654321",
    wallet: "0x8765432109876543210987654321098765432109",
    timestamp: "2024-03-10 09:15:22"
  },
  {
    username: "damaderoca",
    discordId: "246813579024681357",
    wallet: "0x2468135790246813579024681357902468135790",
    timestamp: "2024-03-09 16:45:33"
  }
]

export default function SmartTagDashboard() {
  const router = useRouter()
  const [selectedChain, setSelectedChain] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showWalletSuccess, setShowWalletSuccess] = useState(false)
  const [saveComplete, setSaveComplete] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [showChainWarning, setShowChainWarning] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [walletHistory, setWalletHistory] = useState(mockHistory)
  const [currentWallet, setCurrentWallet] = useState("")
  const itemsPerPage = 5

  useEffect(() => {
    const isInstalled = localStorage.getItem('smartTagInstalled') === 'true'
    if (!isInstalled) {
      router.push('/?showSmartTagDetails=true')
      return
    }
  }, [router])

  const handleSave = () => {
    if (!selectedChain || isSaving || saveComplete) return
    
    setIsSaving(true)
    // Simulate save operation
    setTimeout(() => {
      setIsSaving(false)
      setSaveComplete(true)
      setShowSuccess(true)
      // Hide success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
      }, 3000)
    }, 1000)
  }

  const handleWalletSave = () => {
    if (!selectedChain) {
      setShowChainWarning(true)
      return
    }
    
    // Add new entry to history
    const newEntry = {
      username: "gap8880", // This would come from the actual user data
      discordId: "123456789012345678", // This would come from the actual user data
      wallet: walletAddress,
      timestamp: new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).replace(',', '')
    }
    
    setWalletHistory([newEntry, ...walletHistory])
    setCurrentWallet(walletAddress)
    setWalletAddress("")
    
    // Show success message
    setShowWalletSuccess(true)
    setTimeout(() => {
      setShowWalletSuccess(false)
    }, 3000)
  }

  const totalPages = Math.ceil(walletHistory.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = walletHistory.slice(startIndex, endIndex)

  return (
    <div className="flex h-screen bg-[#1e1f22]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Chain Success Message */}
        {showSuccess && (
          <div className="fixed bottom-4 right-4 bg-[#3ba55c] text-white px-4 py-2 rounded-md flex items-center gap-2">
            <span>SmartTag chain changed successfully to {selectedChain}</span>
            <button onClick={() => setShowSuccess(false)} className="hover:opacity-80">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Wallet Success Message */}
        {showWalletSuccess && (
          <div className="fixed bottom-4 right-4 bg-[#3ba55c] text-white px-4 py-2 rounded-md flex items-center gap-2">
            <span>Wallet address saved successfully</span>
            <button onClick={() => setShowWalletSuccess(false)} className="hover:opacity-80">
              <X size={20} />
            </button>
          </div>
        )}

        {/* Chain Warning Popup */}
        {showChainWarning && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#2b2d31] p-6 rounded-lg max-w-md w-full mx-4">
              <h3 className="text-white text-lg font-semibold mb-2">Select a Chain First</h3>
              <p className="text-gray-300 mb-4">
                Please select a chain to activate SmartTag in your server before configuring the rewards recipient wallet.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowChainWarning(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowChainWarning(false)
                    // Scroll to chain selection
                    document.querySelector('[name="chain-select"]')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-4 py-2 bg-[#f8d568] text-black rounded hover:bg-[#e5c45e]"
                >
                  Select Chain
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Top Banner */}
        <div className="bg-[#f8d568] text-black py-2 px-4 flex justify-center items-center">
          <div className="flex-1 text-center">
            Collab.Land <span className="underline font-medium">Subscriptions</span> are here — make your choice today!
          </div>
          <button className="hover:bg-[#e5c45e] rounded-sm p-1">
            <span className="text-xl">&times;</span>
          </button>
        </div>

        {/* Admin Message Banner */}
        <div className="bg-[#f5f5f5] text-black py-2 px-4 flex justify-center items-center">
          <div className="flex-1 flex justify-center items-center gap-2">
            <div className="w-6 h-6 flex items-center justify-center">
              <Image 
                src="/LogoIconColor.svg" 
                width={24} 
                height={24} 
                alt="Admin icon" 
                className="w-full h-full"
              />
            </div>
            <span>Looking to reach admins? Place your message where they will see it!</span>
            <a href="#" className="text-[#5865f2] hover:underline">Contact us to learn more!</a>
          </div>
          <button className="hover:bg-[#e5e5e5] rounded-sm p-1">
            <span className="text-xl">&times;</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto p-6">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              SmartTag
              <span className="text-xs bg-[#f8d568] text-black px-2 py-0.5 rounded">PRO</span>
            </h1>
          </div>

          {/* Description */}
          <div className="text-gray-300 space-y-4 mb-8">
            <p>
              SmartTag is Collab.Land's onchain transaction solution for communities on Discord. It allows members to send, receive, and manage tokens directly in chat by simply tagging usernames - no need to know wallet addresses. Powered by smart accounts, SmartTag makes blockchain interactions smooth, secure, and user-friendly, all done within Discord.
            </p>
            <p>
              Admins with the TagMaster role can earn 2% of transaction fees by entering a wallet address that can receive tokens in the selected chain, and Exclusive communities enjoy 100 gas-sponsored transactions per month. SmartTag supports multiple chains and tokens, making it a flexible tool for community rewards, event prizes, payments, and more.
            </p>
          </div>

          {/* Chain Configuration */}
          <div className="mb-8">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <span className="text-white text-lg font-semibold">Configured Chain</span>
                  <div className="relative group">
                    <Info size={16} className="text-gray-400 cursor-help" />
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-80 p-2 bg-black text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      Select a chain to enable sending tokens on that network within your server. You can only select 1 chain at a time.
                    </div>
                  </div>
                  <span className="text-white text-lg font-semibold">:</span>
                </div>
              </div>
              <div className="flex gap-4">
                <select 
                  className="bg-[#2b2d31] text-white px-4 py-2 rounded-md border border-[#f8d568] focus:outline-none focus:ring-2 focus:ring-[#f8d568]"
                  value={selectedChain}
                  onChange={(e) => {
                    setSelectedChain(e.target.value)
                    setSaveComplete(false)
                  }}
                >
                  {!saveComplete && <option value="">Select a chain</option>}
                  <option value="arbitrum">Arbitrum</option>
                  <option value="base">Base</option>
                  <option value="optimism">Optimism</option>
                </select>
                <button 
                  onClick={handleSave}
                  disabled={!selectedChain || isSaving || saveComplete}
                  className={`px-6 py-2 rounded-md transition-colors ${
                    !selectedChain || isSaving || saveComplete 
                      ? 'bg-gray-500 text-gray-300 cursor-not-allowed' 
                      : 'bg-[#f8d568] text-black hover:bg-[#e5c45e]'
                  }`}
                >
                  {isSaving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </div>
            
            {/* Token Links */}
            <div className="mt-4 text-sm">
              <p className="text-white">
                See list <a href="https://docs.collab.land/help-docs/key-features/smarttag/" target="_blank" rel="noopener noreferrer" className="text-[#f8d568] hover:underline">here</a> of all supported tokens. Want to add your own token? <a href="https://forms.gle/GFVEE3BqRM8Uu7n27" target="_blank" rel="noopener noreferrer" className="text-[#f8d568] hover:underline">Submit here</a>
              </p>
            </div>
          </div>

          {/* Rewards Recipient Configuration */}
          <div className="mb-8">
            <div className="flex items-center gap-1 mb-4">
              <span className="text-white text-lg font-semibold">Rewards Recipient Wallet</span>
              <div className="relative group">
                <Info size={16} className="text-gray-400 cursor-help" />
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-96 p-2 bg-black text-white text-sm rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  Enter a wallet address to receive 2% of all transaction fees. The wallet must be able to receive tokens on the selected chain.
                </div>
              </div>
              <span className="text-white text-lg font-semibold">:</span>
            </div>

            <div className="flex gap-4 mb-2">
              <input
                type="text"
                placeholder="Enter wallet address"
                value={walletAddress}
                onChange={(e) => setWalletAddress(e.target.value)}
                className="flex-1 max-w-2xl bg-[#2b2d31] text-white px-4 py-2 rounded-md border border-[#f8d568] focus:outline-none focus:ring-2 focus:ring-[#f8d568]"
              />
              <button 
                onClick={handleWalletSave}
                disabled={!walletAddress}
                className={`px-6 py-2 rounded-md ${
                  !walletAddress
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-[#f8d568] text-black hover:bg-[#e5c45e]'
                }`}
              >
                Save
              </button>
            </div>

            {/* Current Wallet Display */}
            {currentWallet && (
              <div className="text-gray-400 text-sm mb-6">
                Active wallet: <span className="text-white">{currentWallet}</span>
              </div>
            )}

            {/* Configuration History */}
            <div className="max-w-5xl mt-8">
              <h3 className="text-white text-sm font-semibold mb-2">Wallet Configuration History</h3>
              <div className="bg-[#2b2d31] rounded-md overflow-hidden border border-[#f8d568]/30">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#1e1f22] text-gray-300">
                      <th className="py-2 px-4 text-left font-medium w-32">Username</th>
                      <th className="py-2 px-4 text-left font-medium w-44">Discord ID</th>
                      <th className="py-2 px-4 text-left font-medium">Wallet</th>
                      <th className="py-2 px-4 text-left font-medium w-44">Date & Time</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    {currentItems.map((entry, index) => (
                      <tr key={index} className="border-t border-[#1e1f22]">
                        <td className="py-2 px-4">{entry.username}</td>
                        <td className="py-2 px-4">{entry.discordId}</td>
                        <td className="py-2 px-4">{entry.wallet}</td>
                        <td className="py-2 px-4">{entry.timestamp}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination Controls */}
                <div className="flex justify-between items-center px-4 py-3 border-t border-[#1e1f22]">
                  <div className="text-gray-300 text-sm">
                    Showing {startIndex + 1}-{Math.min(endIndex, walletHistory.length)} of {walletHistory.length} entries
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className={`p-1 rounded ${
                        currentPage === 1
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-[#f8d568] hover:text-[#e5c45e]'
                      }`}
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <div className="flex gap-1">
                      {[...Array(totalPages)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`w-8 h-8 rounded ${
                            currentPage === i + 1
                              ? 'bg-[#f8d568] text-black'
                              : 'text-gray-300 hover:bg-[#1e1f22]'
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`p-1 rounded ${
                        currentPage === totalPages
                          ? 'text-gray-500 cursor-not-allowed'
                          : 'text-[#f8d568] hover:text-[#e5c45e]'
                      }`}
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Placeholder */}
          <div className="border border-[#f8d568] rounded-lg p-8 mb-8 flex items-center justify-center max-w-3xl mx-auto h-80 mt-16">
            <h2 className="text-[#f8d568] text-2xl font-semibold">Analytics Coming Soon</h2>
          </div>
        </div>
      </div>
    </div>
  )
}
