"use client"

import * as Form from "@radix-ui/react-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import { z } from "zod"
import GoogleLogo from "@/assets/googleLogo"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const LoginPage = () => {
  const router = useRouter()

  const handleGoogleLogin = async () => {
    try {
      window.location.href = "/api/v1/auth/google"
    } catch (err: any) {
      alert(err.message || "Something went wrong.")
    }
  }

  const handleSubmit = async (data) => {
    try {
      // Call the API
      const response = await fetch("/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.")
      }

      const resp = await response.json()
      console.log("Login successful:", resp)

      // Redirect or perform further actions
      alert("Login successful!")
      router.push("/")
    } catch (err: any) {
      alert(err.message || "Something went wrong.")
    }
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    const result = loginSchema.safeParse(data)

    if (result.success) {
      handleSubmit(result.data)
    } else {
      alert("Validation errors:\n" + result.error.errors.map((err) => `${err.path[0]}: ${err.message}`).join("\n"))
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">Login</h1>
        <Form.Root onSubmit={handleFormSubmit} className="space-y-4">
          {/* Email Field */}
          <Form.Field name="email">
            <div className="flex flex-col">
              <Form.Label className="mb-1 text-sm font-medium">Email</Form.Label>
              <Form.Control asChild>
                <input
                  className="w-full rounded border border-gray-300 p-2"
                  type="email"
                  placeholder="Enter your email"
                  required
                  name="email"
                />
              </Form.Control>
            </div>
            <Form.Message className="mt-1 text-sm text-red-500" match="valueMissing">
              Email is required.
            </Form.Message>
            <Form.Message className="mt-1 text-sm text-red-500" match="typeMismatch">
              Invalid email address.
            </Form.Message>
          </Form.Field>

          {/* Password Field */}
          <Form.Field name="password">
            <div className="flex flex-col">
              <Form.Label className="mb-1 text-sm font-medium">Password</Form.Label>
              <Form.Control asChild>
                <input
                  className="w-full rounded border border-gray-300 p-2"
                  type="password"
                  placeholder="Enter your password"
                  required
                  name="password"
                  minLength={6}
                />
              </Form.Control>
            </div>
            <Form.Message className="mt-1 text-sm text-red-500" match="valueMissing">
              Password is required.
            </Form.Message>
            <Form.Message className="mt-1 text-sm text-red-500" match="tooShort">
              Password must be at least 6 characters long
            </Form.Message>
          </Form.Field>

          {/* Submit Button */}
          <Form.Submit asChild>
            <button type="submit" className="w-full rounded bg-blue-500 p-2 text-white hover:bg-blue-600">
              Login
            </button>
          </Form.Submit>
        </Form.Root>

        {/* OR Divider */}
        <div className="relative flex items-center py-4">
          <div className="grow border-t border-gray-300"></div>
          <span className="mx-4 shrink text-gray-500">OR</span>
          <div className="grow border-t border-gray-300"></div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center rounded border border-gray-300 p-2 hover:bg-gray-100"
        >
          <span className="mr-2">
            <GoogleLogo />
          </span>
          Login with Google
        </button>

        {/* Navigation to Register */}
        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage
