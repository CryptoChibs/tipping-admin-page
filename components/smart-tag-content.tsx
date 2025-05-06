"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import InstallConfirmationModal from "./install-confirmation-modal"

export default function SmartTagContent() {
  const router = useRouter()
  const [hasExclusivePlan, setHasExclusivePlan] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showInstallModal, setShowInstallModal] = useState(false)

  useEffect(() => {
    setHasExclusivePlan(localStorage.getItem('hasExclusivePlan') === 'true')
    setIsInstalled(localStorage.getItem('smartTagInstalled') === 'true')
  }, [])

  const handleInstall = () => {
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
    localStorage.removeItem('smartTagInstalled')
    setIsInstalled(false)
  }

  return (
    <div>
      <InstallConfirmationModal
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        onConfirm={handleConfirmInstall}
        appName="SmartTag"
      />
      
      <div className="flex items-center gap-3 mb-4">
        <h1 className="text-2xl font-bold text-white">SmartTag</h1>
        <span className="bg-[#f8d568] text-black text-xs px-2 py-0.5 rounded">NEW</span>
      </div>

      <p className="text-gray-300 mb-8">Add Apps to Enhance Your Community</p>

      <div className="flex gap-8 mb-12">
        <div className="w-32 h-32 rounded-full overflow-hidden flex-shrink-0 bg-[#f8d568] flex items-center justify-center">
          <Image 
            src="/SmartTag Icon Centered.png" 
            width={128} 
            height={128} 
            alt="SmartTag" 
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="text-gray-400 text-sm mb-2">Created 5 months ago</div>
          <p className="text-white text-lg mb-4">
            Send, receive, withdraw tokens, and more - fully onchain, right inside your community. Just tag a username. Smart accounts + Discord login = simple, secure, seamless.
          </p>
          {hasExclusivePlan ? (
            isInstalled ? (
              <button 
                onClick={handleUninstall}
                className="bg-transparent text-white border border-[#f04747] px-4 py-2 rounded-md hover:bg-[#f04747] hover:bg-opacity-10"
              >
                UNINSTALL
              </button>
            ) : (
              <button 
                onClick={handleInstall}
                className="bg-[#f8d568] text-black px-4 py-2 rounded-md hover:bg-[#e5c45e]"
              >
                INSTALL
              </button>
            )
          ) : (
            <button 
              onClick={() => router.push('/subscriptions')}
              className="bg-[#f8d568] text-black px-4 py-2 rounded-md hover:bg-[#e5c45e]"
            >
              BUY
            </button>
          )}
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-white text-xl font-bold mb-4">About this app</h2>
          <p className="text-gray-300 mb-4">Available for Exclusive plan subscribers only. See all features included in our Exclusive plan <a href="/subscriptions" className="text-[#f8d568] hover:underline">here</a>.</p>
          
          <div className="mb-6">
            <h3 className="text-white mb-2">Innovations:</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Smart Accounts for Everyone: We create a Smart Account for each member — no external wallets or private keys needed. It all works through Discord.</li>
              <li>• Transparent Transactions: Efficient and secure onchain transactions.</li>
              <li>• Integrated Fees: Use the tipping token to cover fees. No 2nd gas token needed.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-white mb-2">Seamless and Frictionless:</h3>
            <p className="text-gray-300">
              Members can send and receive tokens within Discord communities easily. No need to know the recipient's wallet address; tagging their username or User ID is all you need.
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-white mb-2">Benefits of SmartTag:</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Increased Token Activity: All transactions happen onchain and are visible on public block explorers - showcasing your token's usage and boosting transaction volume.</li>
              <li>• Wide Availability: Once added, your token will be available for use in all Collab.Land Exclusive communities. <em>Wider launch coming soon</em></li>
              <li>• Engage and Reward Members: Spread good vibes, welcome newcomers, recognize achievements, reward awesome behavior, send payments, and even trade tokens - it's only limited by your imagination with SmartTag!</li>
              <li>• Contests and Competitions: Use SmartTag to send prizes and rewards in tournaments, giveaways and other community events.</li>
              <li>• Rewards: Community admins with the TagMaster role can designate a wallet to receive 2% of transaction fees. This role is automatically assigned to whoever installs the miniapp and can also be manually granted to others. The designated wallet must match the selected chain to receive the rewards.</li>
              <li>• Gas Sponsoring: Exclusive communities get 100 sponsored transactions each month, with us covering the gas fees. The sponsorship refreshes at the beginning of every month, providing ongoing support for your community.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-white mb-2">To Get Started:</h3>
            <p className="text-gray-300">
              All Exclusive and higher subscribers have the option to add Collab.Land SmartTag to their server. We currently support tokens on: Arbitrum (COLLAB, USDC, USDT), Base (USDC, USDT) and Optimism (COLLAB, USDC, USDT) - more coming soon!
            </p>
          </div>

          <div>
            <p className="text-gray-300">
              If you want to add your own token/s, start here:{" "}
              <a href="https://forms.gle/GFVEE3BqRM8Uu7n27" className="text-[#f8d568] hover:underline">
                https://forms.gle/GFVEE3BqRM8Uu7n27
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}
