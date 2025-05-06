"use client"

import React from 'react'

interface InstallConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  appName: string
}

export default function InstallConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  appName
}: InstallConfirmationModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2b2d31] rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-white text-xl font-semibold mb-4">Install {appName}?</h2>
        <div className="text-gray-300 space-y-3 mb-6">
          <p>Installing this miniapp will automatically create a TagMaster role and assign it to you.</p>
          <p>TagMasters can enter a wallet address to receive 2% of this community's transaction fees.</p>
          <p>You can assign the TagMaster role to other admins in Discord anytime.</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-[#393c41] text-white hover:bg-[#4e5058]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-6 py-2 rounded-md bg-[#f8d568] text-black hover:bg-[#e5c45e]"
          >
            Install
          </button>
        </div>
      </div>
    </div>
  )
} 