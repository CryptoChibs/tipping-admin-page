"use client"

import { Search, ChevronDown, Zap, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Sidebar from "@/components/sidebar"
import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import SmartTagContent from "./smart-tag-content"
import InstallConfirmationModal from "./install-confirmation-modal"

export default function MiniappsMarketplace() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showSmartTagDetails, setShowSmartTagDetails] = useState(() => {
    return searchParams.get('showSmartTagDetails') === 'true'
  })
  const [hasExclusivePlan, setHasExclusivePlan] = useState(() => {
    return localStorage.getItem('hasExclusivePlan') === 'true'
  })
  const [isInstalled, setIsInstalled] = useState(() => {
    return localStorage.getItem('smartTagInstalled') === 'true'
  })
  const [showInstallModal, setShowInstallModal] = useState(false)
  const [showUninstallModal, setShowUninstallModal] = useState(false)

  // Update showSmartTagDetails when URL changes
  useEffect(() => {
    setShowSmartTagDetails(searchParams.get('showSmartTagDetails') === 'true')
  }, [searchParams])

  // Listen for uninstall events from other components
  useEffect(() => {
    const handleUninstall = () => {
      setIsInstalled(false)
    }
    window.addEventListener('smartTagUninstalled', handleUninstall)
    return () => window.removeEventListener('smartTagUninstalled', handleUninstall)
  }, [])

  // Handle Exclusive subscription
  const handleExclusiveSubscribe = () => {
    localStorage.setItem('hasExclusivePlan', 'true')
    setHasExclusivePlan(true)
    router.push('/smart-tag')
  }

  // Handle SmartTag Install
  const handleSmartTagInstall = () => {
    if (hasExclusivePlan) {
      setShowInstallModal(true)
    }
  }

  const handleConfirmInstall = () => {
    localStorage.setItem('smartTagInstalled', 'true')
    setIsInstalled(true)
    router.push('/smart-tag-dashboard')
  }

  const handleUninstall = () => {
    setShowUninstallModal(true)
  }

  const handleConfirmUninstall = () => {
    localStorage.removeItem('smartTagInstalled')
    setIsInstalled(false)
    setShowUninstallModal(false)
  }

  return (
    <div className="flex h-screen bg-[#1e1f22]">
      <InstallConfirmationModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onConfirm={handleConfirmInstall}
        appName="SmartTag"
      />
      <InstallConfirmationModal
        isOpen={showUninstallModal}
        onClose={() => setShowUninstallModal(false)}
        onConfirm={handleConfirmUninstall}
        appName="SmartTag"
        mode="uninstall"
      />
      <Sidebar />
      <div className="flex-1 flex flex-col">
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
            <h1 className="text-2xl font-bold text-white mb-2">
              {showSmartTagDetails ? (
                <button 
                  onClick={() => {
                    setShowSmartTagDetails(false)
                    router.push('/')
                  }}
                  className="flex items-center gap-2 hover:text-gray-300"
                >
                  <ArrowLeft size={24} />
                  Back to Miniapps
                </button>
              ) : (
                <>
                  MINIAPP MARKETPLACE <span className="text-xs bg-[#5865f2] text-white px-1 rounded">BETA</span>
                </>
              )}
            </h1>
            {!showSmartTagDetails && (
              <p className="text-gray-300">One-Click Install Miniapps to Supercharge ⚡ Your Collab.Land Bot</p>
            )}
          </div>

          {!showSmartTagDetails ? (
            <>
              {/* Search and Filters */}
              <div className="flex gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search by title"
                    className="w-full bg-[#2b2d31] text-white pl-10 pr-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5865f2]"
                  />
                </div>
                <button className="bg-[#2b2d31] text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-[#393c41]">
                  Filters
                  <ChevronDown size={16} />
                </button>
                <div className="flex items-center gap-2 text-gray-400">
                  <span>Sort cards by</span>
                  <button className="flex items-center gap-1 hover:text-white">
                    date added (recent)
                    <ChevronDown size={16} />
                  </button>
                </div>
              </div>

              <button className="bg-[#2b2d31] text-white px-4 py-2 rounded-md hover:bg-[#393c41] mb-8">
                Show my apps
              </button>

              <div className="text-gray-300 mb-4">All the apps</div>

              {/* App Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Role Composition Card */}
                <div className="bg-[#2b2d31] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="/LogoIconColor.svg" 
                        width={48} 
                        height={48} 
                        alt="Role Composition" 
                        className="w-full h-full object-contain scale-150 transform -translate-y-1"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">Role Composition</h3>
                        <span className="text-xs bg-yellow-500 text-black px-1 rounded">CC Extension</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">Role Composition enables AND/OR logic for combining multiple Token Granted Roles (TGRs) in order to assign a single Discord role.</p>
                      <div className="flex gap-2">
                        <button className="bg-[#f8d568] text-black px-4 py-1 rounded-md hover:bg-[#e5c45e] flex items-center gap-1">
                          <span>Buy</span>
                        </button>
                        <button className="bg-[#393c41] text-white px-4 py-1 rounded-md hover:bg-[#4e5058]">
                          Show details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* POAP Card */}
                <div className="bg-[#2b2d31] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/poap.png" width={48} height={48} alt="POAP" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">POAP</h3>
                        <span className="text-xs bg-yellow-500 text-black px-1 rounded">Bot Command</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">With the POAP app, you can easily distribute POAPs to your community members in Discord using slash commands.</p>
                      <div className="flex gap-2">
                        <button className="bg-[#f8d568] text-black px-4 py-1 rounded-md hover:bg-[#e5c45e] flex items-center gap-1">
                          <span>Buy</span>
                        </button>
                        <button className="bg-[#393c41] text-white px-4 py-1 rounded-md hover:bg-[#4e5058]">
                          Show details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Snapshot Card */}
                <div className="bg-[#2b2d31] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/snapshot.png" width={48} height={48} alt="Snapshot" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">Snapshot</h3>
                        <span className="text-xs bg-green-500 text-black px-1 rounded">CC Extension</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">The Snapshot app allows you to receive notifications in your DAO or communities Discord whenever a Snapshot proposal is...</p>
                      <div className="flex gap-2">
                        <button className="bg-[#f8d568] text-black px-4 py-1 rounded-md hover:bg-[#e5c45e] flex items-center gap-1">
                          <span>Install</span>
                        </button>
                        <button className="bg-[#393c41] text-white px-4 py-1 rounded-md hover:bg-[#4e5058]">
                          Show details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sobol Card */}
                <div className="bg-[#2b2d31] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/sobol.png" width={48} height={48} alt="Sobol" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">Sobol</h3>
                        <span className="text-xs bg-green-500 text-black px-1 rounded">Bot Command</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">Generate a beautiful community map from Collab.Land Token Gates and Discord guild member profiles.</p>
                      <div className="flex gap-2">
                        <button className="bg-[#f8d568] text-black px-4 py-1 rounded-md hover:bg-[#e5c45e] flex items-center gap-1">
                          <span>Install</span>
                        </button>
                        <button className="bg-[#393c41] text-white px-4 py-1 rounded-md hover:bg-[#4e5058]">
                          Show details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* SmartTag Card */}
                <div className="bg-[#2b2d31] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image 
                        src="/SmartTag Icon Centered.png" 
                        width={48} 
                        height={48} 
                        alt="SmartTag" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">SmartTag</h3>
                        <span className="text-xs bg-yellow-500 text-black px-1 rounded">Bot Command</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">Send, receive, withdraw tokens, and more - fully onchain, right inside your community. Just tag a username. Smart accounts + Discord login = simple, secure, seamless.</p>
                      <div className="flex gap-2">
                        {hasExclusivePlan ? (
                          isInstalled ? (
                            <button 
                              onClick={handleUninstall}
                              className="bg-transparent text-white border border-[#f04747] px-4 py-1 rounded-md hover:bg-[#f04747] hover:bg-opacity-10 flex items-center gap-1"
                            >
                              <span>Uninstall</span>
                            </button>
                          ) : (
                            <button 
                              onClick={handleSmartTagInstall}
                              className="bg-[#f8d568] text-black px-4 py-1 rounded-md hover:bg-[#e5c45e] flex items-center gap-1"
                            >
                              <span>Install</span>
                            </button>
                          )
                        ) : (
                          <button 
                            onClick={() => router.push('/subscriptions')}
                            className="bg-[#f8d568] text-black px-4 py-1 rounded-md hover:bg-[#e5c45e] flex items-center gap-1"
                          >
                            <span>Buy</span>
                          </button>
                        )}
                        <button 
                          onClick={() => {
                            setShowSmartTagDetails(true)
                            router.push('/?showSmartTagDetails=true')
                          }}
                          className="bg-[#393c41] text-white px-4 py-1 rounded-md hover:bg-[#4e5058]"
                        >
                          Show details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Proof of Humanity Card */}
                <div className="bg-[#2b2d31] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/rarimo.png" width={48} height={48} alt="Proof of Humanity" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">Proof of Humanity</h3>
                        <span className="text-xs bg-green-500 text-black px-1 rounded">Free</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">Keep your server bot free using Parimo's Proof-of-Humanity plug-in</p>
                      <div className="flex gap-2">
                        <button className="bg-[#f8d568] text-black px-4 py-1 rounded-md hover:bg-[#e5c45e] flex items-center gap-1">
                          <span>Install</span>
                        </button>
                        <button className="bg-[#393c41] text-white px-4 py-1 rounded-md hover:bg-[#4e5058]">
                          Show details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ChainPatrol Card */}
                <div className="bg-[#2b2d31] rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image src="/chainpatrol.png" width={48} height={48} alt="ChainPatrol" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-medium">ChainPatrol</h3>
                        <span className="text-xs bg-green-500 text-black px-1 rounded">Free</span>
                      </div>
                      <p className="text-sm text-gray-300 mb-4">ChainPatrol adds security tools to protect your Web3 community from scams</p>
                      <div className="flex gap-2">
                        <button className="bg-[#f8d568] text-black px-4 py-1 rounded-md hover:bg-[#e5c45e] flex items-center gap-1">
                          <span>Install</span>
                        </button>
                        <button className="bg-[#393c41] text-white px-4 py-1 rounded-md hover:bg-[#4e5058]">
                          Show details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <SmartTagContent />
          )}
        </div>
      </div>
    </div>
  )
} 