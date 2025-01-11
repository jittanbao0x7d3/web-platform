"use client"

import React, { useState } from "react"

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    // Handle forgot password logic here
    console.log("Forgot password for:", email)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-2xl font-bold">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full rounded border p-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="w-full rounded bg-blue-500 py-2 text-white hover:bg-blue-600">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  )
}

export default ForgotPasswordPage
