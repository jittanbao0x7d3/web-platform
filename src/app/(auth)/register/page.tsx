"use client"

import * as Form from "@radix-ui/react-form"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import { z } from "zod"

const registerSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

const RegisterPage = () => {
  const router = useRouter()
  const handleSubmit = async (data) => {
    try {
      // Call the API
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to login. Please check your credentials.")
      }

      const resp: any = await response.json()
      if (resp.status === "error") {
        alert(resp.message)
        return
      }

      if (resp.status === "success") {
        alert("Register successful!")
        router.push("/login")
      }
    } catch (err: any) {
      alert(err.message || "Something went wrong.")
    }
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const result = registerSchema.safeParse(data)

    if (result.success) {
      handleSubmit(result.data)
    } else {
      alert("Validation errors:\n" + result.error.errors.map((err) => `${err.path[0]}: ${err.message}`).join("\n"))
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-center text-2xl font-bold">Register</h1>
        <Form.Root onSubmit={handleFormSubmit} className="space-y-4">
          {/* First Name Field */}
          <Form.Field name="firstName">
            <div className="flex flex-col">
              <Form.Label className="mb-1 text-sm font-medium">First Name</Form.Label>
              <Form.Control asChild>
                <input
                  className="w-full rounded border border-gray-300 p-2"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </Form.Control>
            </div>
            <Form.Message className="mt-1 text-sm text-red-500" match="valueMissing">
              Name is required.
            </Form.Message>
          </Form.Field>

          {/* Last Name field */}
          <Form.Field name="lastName">
            <div className="flex flex-col">
              <Form.Label className="mb-1 text-sm font-medium">Last Name</Form.Label>
              <Form.Control asChild>
                <input
                  className="w-full rounded border border-gray-300 p-2"
                  type="text"
                  placeholder="Enter your name"
                  required
                />
              </Form.Control>
            </div>
            <Form.Message className="mt-1 text-sm text-red-500" match="valueMissing">
              Name is required.
            </Form.Message>
          </Form.Field>

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
                  placeholder="Create a password"
                  minLength={6}
                  required
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
            <button type="submit" className="w-full rounded bg-green-500 p-2 text-white hover:bg-green-600">
              Register
            </button>
          </Form.Submit>
        </Form.Root>

        {/* Navigation to Login */}
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
