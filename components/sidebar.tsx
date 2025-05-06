"use client"

import { CircleDollarSign, Bot, MessageSquare, Shield, Ticket, Zap } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [hasExclusivePlan, setHasExclusivePlan] = useState(false)

  // Check if SmartTag is installed and if user has Exclusive plan
  useEffect(() => {
    const installed = localStorage.getItem("smartTagInstalled") === "true"
    const exclusive = localStorage.getItem("hasExclusivePlan") === "true"
    setHasExclusivePlan(exclusive)
  }, [])

  const handleSmartTagClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (!hasExclusivePlan) {
      router.push('/?showSmartTagDetails=true')
    } else {
      router.push('/smart-tag-dashboard')
    }
  }

  return (
    <div className="w-60 bg-[#2b2d31] flex flex-col h-full">
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image 
              src="/LogoIconColor.svg" 
              width={32} 
              height={32} 
              alt="Collab.Land logo" 
              className="w-full h-full"
            />
          </div>
          <div>
            <div className="font-semibold text-white">The Collab.Land Discord</div>
            <div className="text-sm text-gray-400 flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Logged in with Discord
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2 text-sm text-gray-400">Premium Services</div>

        <NavItem label="Subscriptions" href="/subscriptions" active={pathname === "/subscriptions"} />
        <NavItem 
          label="SmartTag" 
          isPro
          href={hasExclusivePlan ? "/smart-tag-dashboard" : "#"}
          onClick={!hasExclusivePlan ? handleSmartTagClick : undefined}
          active={pathname === "/smart-tag-dashboard"}
        />
        <NavItem label="Role Composition" isPro href="#" />

        <div className="p-2 text-sm text-gray-400">Collab.Land Core</div>

        <NavItem label="Bot Config" href="#" />
        <NavItem label="Miniapps" href="/" active={pathname === "/" || pathname === "/miniapps"} />
        <NavItem label="Role Troubleshooting" href="#" />
        <NavItem label="Token Gating Rules (TGRs)" href="#" />
      </div>

      {/* Bottom buttons */}
      <div className="p-4 space-y-2 border-t border-gray-700">
        <button className="w-full bg-[#3ba55c] hover:bg-[#2d8a46] text-white py-2 px-4 rounded flex items-center justify-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <Image 
              src="/LogoIcon.svg" 
              width={20} 
              height={20} 
              alt="Collab.Land icon" 
              className="w-full h-full"
            />
          </div>
          <span>Donate</span>
        </button>

        <button className="w-full bg-[#f8d568] hover:bg-[#e5c45e] text-black py-2 px-4 rounded flex items-center justify-center gap-2">
          <div className="w-5 h-5 flex items-center justify-center">
            <Image 
              src="/LogoIcon.svg" 
              width={20} 
              height={20} 
              alt="Collab.Land icon" 
              className="w-full h-full"
            />
          </div>
          <span>Support</span>
        </button>

        <div className="text-xs text-center text-gray-500 mt-4">Release notes - v18.0</div>
      </div>
    </div>
  )
}

interface NavItemProps {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  isPro?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
}

function NavItem({ icon, label, active = false, isPro = false, href = "#", onClick }: NavItemProps) {
  return (
    <Link href={href} className="block" onClick={onClick}>
      <div
        className={`flex items-center gap-3 px-2 py-2 mx-2 rounded ${active ? "bg-[#393c41]" : "hover:bg-[#35373c]"}`}
      >
        {icon && <div className="text-gray-300">{icon}</div>}
        <div className="text-gray-300">{label}</div>
        {isPro && (
          <div className="ml-2 bg-[#f8d568] text-black text-xs px-2 py-0.5 rounded-full font-semibold" style={{fontSize: '0.85em'}}>Pro</div>
        )}
      </div>
    </Link>
  )
}
