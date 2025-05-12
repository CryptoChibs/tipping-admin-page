"use client"

import React, { useState, useEffect } from 'react'

interface InstallConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  appName: string
  mode?: 'install' | 'uninstall'
}

const installSteps = [
  {
    title: "SmartTag",
    content: "Installing this miniapp will automatically create a TagMaster role and assign it to you."
  },
  {
    title: "SmartTag",
    content: "Ensure that the Collab.Land role is positioned above the roles of any members who will receive the SmartTag role."
  },
  {
    title: "SmartTag",
    content: "TagMasters can enter a wallet address to receive 2% of this community's transaction fees."
  },
  {
    title: "SmartTag",
    content: "You can assign the TagMaster role to other admins in Discord anytime."
  },
  {
    title: "SmartTag",
    content: "Are you sure you want to install the SmartTag Miniapp?"
  }
]

const uninstallStep = {
  title: "SmartTag",
  content: "Are you sure you want to uninstall the SmartTag Miniapp? Data will be deleted!"
}

export default function InstallConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  appName,
  mode = 'install'
}: InstallConfirmationModalProps) {
  const [currentStep, setCurrentStep] = useState(0)

  // Reset step when modal is closed
  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0)
    }
  }, [isOpen])

  if (!isOpen) return null

  const isLastStep = mode === 'uninstall' ? true : currentStep === installSteps.length - 1
  const steps = mode === 'install' ? installSteps : [uninstallStep]

  const handleNext = () => {
    if (isLastStep) {
      onConfirm()
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(prev => prev - 1)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2b2d31] rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-white text-xl font-semibold mb-4 text-center">
          {steps[currentStep].title}
        </h2>
        {mode === 'install' && (
          <div className="mb-6">
            <div className="text-sm text-gray-400 mb-2">
              Step {currentStep + 1} of {installSteps.length}
            </div>
            <div className="w-full h-2 bg-[#393c41] rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#f8d568] transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep + 1) / installSteps.length) * 100}%` }}
              />
            </div>
          </div>
        )}
        <div className="text-gray-300 space-y-3 mb-6">
          <p>{steps[currentStep].content}</p>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-md bg-[#393c41] text-white hover:bg-[#4e5058]"
          >
            Cancel
          </button>
          {mode === 'install' && currentStep > 0 && (
            <button
              onClick={handleBack}
              className="px-6 py-2 rounded-md bg-[#393c41] text-white hover:bg-[#4e5058]"
            >
              Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="px-6 py-2 rounded-md bg-[#f8d568] text-black hover:bg-[#e5c45e]"
          >
            {isLastStep ? (mode === 'install' ? 'Install' : 'Uninstall') : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
} 