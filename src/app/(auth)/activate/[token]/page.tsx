"use client"

import { useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import axios from "@/lib/utils/axios"

const ActivationPage: React.FC = () => {
  const [activationStatus, setActivationStatus] = useState<string | null>(null)
  const [message, setMessage] = useState<string>("")
  const { token } = useParams()

  useEffect(() => {
    const activateAccount = async () => {
      console.log(token)
      if (token) {
        try {
          // Replace with your actual API endpoint
          const response = await axios.post(`/auth/activate/${token}`)
          console.log(response)

          if (response.status === 200) {
            setActivationStatus("success")
            setMessage("Your account has been successfully activated!")
          } else {
            setActivationStatus("error")
            setMessage(response.data.error || "An error occurred during activation.")
          }
        } catch (error: any) {
          console.error("Error activating account:", error)
          setActivationStatus("error")
          setMessage(error.response?.data?.error || "An unexpected error occurred. Please try again later.")
        }
      }
    }

    activateAccount()
  }, [token])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Account Activation</h2>
        {activationStatus === "success" ? (
          <div className="text-center text-green-500">{message}</div>
        ) : activationStatus === "error" ? (
          <div className="text-center text-red-500">{message}</div>
        ) : (
          <div className="text-center text-gray-700">Activating your account, please wait...</div>
        )}
      </div>
    </div>
  )
}

export default ActivationPage
