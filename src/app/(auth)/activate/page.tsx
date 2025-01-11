"use client"

import { useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"

const ActivationPage: React.FC = () => {
  const [activationStatus, setActivationStatus] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  useEffect(() => {
    if (token) {
      // Simulate an API call to activate the account
      // Replace this with your actual activation logic
      setTimeout(() => {
        setActivationStatus("success")
      }, 2000)
    }
  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Account Activation</h2>
        {activationStatus === "success" ? (
          <div className="text-center text-green-500">Your account has been successfully activated!</div>
        ) : (
          <div className="text-center text-gray-700">Activating your account, please wait...</div>
        )}
      </div>
    </div>
  )
}

export default ActivationPage
