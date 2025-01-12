"use client";

import React, { useState } from "react";
import axios from "@/lib/utils/axios"

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axios.post("/auth/forgot-password", { email });

      if (response.status === 200) {
        setMessage("A password reset link has been sent to your email.");
      } else {
        setMessage(response.data.error || "An error occurred. Please try again.");
      }
    } catch (error: any) {
      console.error("Error sending reset link:", error);
      setMessage(
          error.response?.data?.error || "An unexpected error occurred. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
          <h2 className="mb-6 text-center text-2xl font-bold">Forgot Password</h2>
          {message && (
              <div
                  className={`mb-4 text-center ${
                      message.includes("error") || message.includes("unexpected")
                          ? "text-red-500"
                          : "text-green-500"
                  }`}
              >
                {message}
              </div>
          )}
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
            <button
                type="submit"
                className={`w-full rounded bg-blue-500 py-2 text-white ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                }`}
                disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
  );
};

export default ForgotPasswordPage;