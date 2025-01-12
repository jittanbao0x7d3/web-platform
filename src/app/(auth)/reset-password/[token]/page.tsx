"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "@/lib/utils/axios"

const ResetPasswordPage: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const searchParams = useSearchParams();
    const token = searchParams.get("token"); // Retrieve the token from the URL query parameters.

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            setIsSubmitting(false);
            return;
        }

        try {
            // Replace with your actual API endpoint
            const response = await axios.post(`/api/reset-password/${token}`, {
                newPassword: password,
            });

            if (response.status === 200) {
                setMessage("Your password has been successfully reset. You can now log in.");
            } else {
                setMessage(response.data.error || "An error occurred. Please try again.");
            }
        } catch (error: any) {
            console.error("Error resetting password:", error);
            setMessage(
                error.response?.data?.error || "An unexpected error occurred. Please try again later."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!token) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <div className="w-full max-w-md rounded bg-white p-8 shadow-md text-center">
                    <h2 className="mb-6 text-2xl font-bold text-red-500">Invalid Link</h2>
                    <p className="text-gray-700">
                        The password reset link is invalid or expired. Please request a new one.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <div className="w-full max-w-md rounded bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold">Reset Password</h2>
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
                        <label htmlFor="password" className="block text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 w-full rounded border p-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirmPassword" className="block text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            className="mt-1 w-full rounded border p-2"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                        {isSubmitting ? "Resetting Password..." : "Reset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordPage;