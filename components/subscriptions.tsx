"use client"

import { Check } from "lucide-react"
import Sidebar from "@/components/sidebar"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Subscriptions() {
  const router = useRouter()
  const [activeSubscription, setActiveSubscription] = useState(() => {
    // Check if user has exclusive plan
    return localStorage.getItem('hasExclusivePlan') === 'true' ? 'exclusive' : 'starter'
  })

  const handleExclusiveSubscribe = () => {
    localStorage.setItem('hasExclusivePlan', 'true')
    setActiveSubscription('exclusive')
  }

  const handleExclusiveCancel = () => {
    localStorage.setItem('hasExclusivePlan', 'false')
    setActiveSubscription('starter')
  }

  return (
    <div className="flex h-screen bg-[#1e1f22]">
      <Sidebar />
      <div className="flex-1 flex flex-col mr-12">
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
              <img src="/LogoIconColor.svg" width={24} height={24} alt="Collab.Land logo" />
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
          <h1 className="text-2xl font-bold text-white mb-2">Collab.Land Subscriptions</h1>
          <p className="text-gray-400 mb-4">
            The Collab.Land Discord is subscribed to {activeSubscription === 'exclusive' ? 'Exclusive' : 'Starter'}
          </p>
          
          <p className="text-gray-300 mb-8 max-w-4xl">
            We're proud to introduce five custom tiers of Collab.Land service tailored to the needs of our Discord communities. Each tier offers unique features — ones you've all been requesting — such as PRO miniapps, on-demand balance checks, advanced bot and messaging customization, and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mr-4">
            {/* Starter Card */}
            <div className="bg-[#2b2d31] rounded-lg overflow-hidden relative flex flex-col h-full border-2 border-[#3ba55c] border-t-4 max-w-sm" style={{ borderTopColor: '#3ba55c' }}>
              <div className="absolute top-0 right-0 w-full flex justify-end pointer-events-none" style={{ height: '2.5rem' }}>
                <div
                  className="relative"
                  style={{
                    width: '8rem',
                    height: '2.5rem',
                    background: '#3ba55c',
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                  }}
                >
                  <span className="absolute right-2 top-1 text-xs font-bold text-black tracking-wider">FREE</span>
                </div>
              </div>
              <div className="p-4 flex-1">
                <h2 className="text-xl font-bold text-white mb-4">Starter</h2>
                {activeSubscription === 'starter' && (
                  <div className="bg-[#5865f2] text-white text-sm px-2 py-1 rounded inline-block mb-4">
                    ACTIVE
                  </div>
                )}
                <ul className="space-y-3 text-gray-300 mb-6 items-start">
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Up to 4 TGRs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Unlimited members</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Balance checks every week</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Standard Support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Multi-wallet verification</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">38 blockchains*</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">28 wallets, Delegate, OpenSea + WalletConnect*</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Basic Card */}
            <div className="bg-[#2b2d31] rounded-lg overflow-hidden flex flex-col h-full border-2 border-purple-300 border-t-4 max-w-sm" style={{ borderTopColor: '#d6b4fc' }}>
              <div className="p-4 flex-1">
                <h2 className="text-xl font-bold text-white mb-4">Basic</h2>
                <ul className="space-y-3 text-gray-300 mb-6 items-start">
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Up to 10 TGRs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Balance checks every 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Priority Support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Opt-out feature for donate</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Plus all features from STARTER</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 mt-auto">
                <div className="text-white mb-1">Price</div>
                <div className="text-[#f8d568] text-2xl font-bold mb-2">$17.99 USD</div>
                <div className="text-gray-400 text-sm mb-4">Monthly</div>
                <button className="w-full bg-[#f8d568] text-black py-2 px-4 rounded hover:bg-[#e5c45e]">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Premium Card */}
            <div className="bg-[#2b2d31] rounded-lg overflow-hidden p-4 border-2 border-[#f8d568] border-t-4 flex flex-col h-full max-w-sm" style={{ borderTopColor: '#f8d568' }}>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white mb-4">Premium</h2>
                <ul className="space-y-3 text-gray-300 mb-6 items-start">
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Up to 50 TGRs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">PRO miniapps including Role Composition (And/Or) and POAP</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Opt-out feature for community messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">
                      EVM Event Listener: Removes<br />
                      roles in real-time when a token<br />
                      is transferred (Ethereum<br />
                      Mainnet) <span className="inline-block align-middle bg-[#f8d568] text-black text-xs font-bold px-2 py-0.5 rounded ml-2">NEW</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Plus all features from STARTER + BASIC</span>
                  </li>
                </ul>
              </div>
              <div className="mt-auto">
                <div className="text-white mb-1">Price</div>
                <div className="text-[#f8d568] text-2xl font-bold mb-2">$35 USD</div>
                <div className="text-gray-400 text-sm mb-4">Monthly</div>
                <button className="w-full bg-[#f8d568] text-black py-2 px-4 rounded hover:bg-[#e5c45e]">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Exclusive Card */}
            <div className="bg-[#2b2d31] rounded-lg overflow-hidden relative flex flex-col h-full border-2 border-[#5865f2] border-t-4 max-w-sm" style={{ borderTopColor: '#5865f2' }}>
              <div className="absolute top-0 right-0 w-full flex justify-end pointer-events-none" style={{ height: '2.5rem' }}>
                <div
                  className="relative"
                  style={{
                    width: '8rem',
                    height: '2.5rem',
                    background: '#5865f2',
                    clipPath: 'polygon(100% 0, 0 0, 100% 100%)'
                  }}
                >
                  <span className="absolute right-2 top-1 text-xs font-bold text-black tracking-wider">PICK ME</span>
                </div>
              </div>
              <div className="p-4 flex-1">
                <h2 className="text-xl font-bold text-white mb-4">Exclusive</h2>
                {activeSubscription === 'exclusive' && (
                  <div className="w-full bg-[#bcd2f7] text-[#222] text-sm font-bold text-center py-2 mb-6 tracking-wider uppercase">
                    ACTIVE
                  </div>
                )}
                <ul className="space-y-3 text-gray-300 mb-6 items-start">
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Up to 150 TGRs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">5 bonus "admin-initiated" balance checks monthly</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Dedicated support human</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Customize your Discord verification channel's Let's Go! message</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Solana Event Listener: Removes roles in real-time when a token is transferred <span className="ml-2 bg-[#f8d568] text-black text-xs font-bold px-2 py-0.5 rounded">NEW</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">SmartTag: Send onchain transactions directly in your community <span className="ml-2 bg-[#f8d568] text-black text-xs font-bold px-2 py-0.5 rounded">NEW</span></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Plus all features from STARTER + BASIC + PREMIUM included</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 mt-auto">
                <div className="text-white mb-1">Price</div>
                <div className="text-[#f8d568] text-2xl font-bold mb-2">$149 USD</div>
                <div className="text-gray-400 text-sm mb-4">Monthly</div>
                {activeSubscription === 'exclusive' ? (
                  <button 
                    onClick={handleExclusiveCancel}
                    className="w-full bg-[#393c41] text-white py-2 px-4 rounded hover:bg-[#4e5058]"
                  >
                    Cancel
                  </button>
                ) : (
                  <button 
                    onClick={handleExclusiveSubscribe}
                    className="w-full bg-[#f8d568] text-black py-2 px-4 rounded hover:bg-[#e5c45e]"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>

            {/* Enterprise Card */}
            <div className="bg-[#2b2d31] rounded-lg overflow-hidden flex flex-col h-full border-2 border-indigo-300 border-t-4 max-w-sm" style={{ borderTopColor: '#a5b4fc' }}>
              <div className="p-4 flex-1">
                <h2 className="text-xl font-bold text-white mb-4">Enterprise</h2>
                <ul className="space-y-3 text-gray-300 mb-6 items-start">
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Unlimited TGRs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">White label</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Change the bot's username</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Change logo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">Personalized features on demand</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-7 flex justify-center mt-1">
                      <Check size={20} className="text-green-200" />
                    </span>
                    <span className="flex-1">PLUS all features from Exclusive included</span>
                  </li>
                </ul>
              </div>
              <div className="p-4 mt-auto">
                <button className="w-full bg-[#393c41] text-white py-2 px-4 rounded hover:bg-[#4e5058]">
                  Contact us for pricing
                </button>
              </div>
            </div>
          </div>

          <p className="text-gray-400 mt-4">
            The full list of blockchains and wallets is <a href="#" className="text-[#f8d568] hover:underline">available here</a>.
          </p>
        </div>
      </div>
    </div>
  )
} 