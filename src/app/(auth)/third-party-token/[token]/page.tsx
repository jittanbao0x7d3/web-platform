"use client"

import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"
import { toast } from "sonner"

const ThirdPartyToken = () => {
  const router = useRouter()
  const { token } = useParams()

  const getDataProfile = async (token) => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      const data = await response.json()
      if (data) {
        localStorage.setItem("userId", data._id)
        localStorage.setItem("email", data.email)
        localStorage.setItem("name", data.firstName + " " + data.lastName)
      }
    } else {
      return null
    }
  }

  useEffect(() => {
    if (token) {
      if (typeof token === "string") {
        localStorage.setItem("token", token)

        getDataProfile(token).then(() => (window.location.href = "/"))
      }
    } else {
      router.push("/login")
      toast("Invalid token")
    }
  }, [router, token])

  return (
    <div>
      <h1>Processing token...</h1>
    </div>
  )
}

export default ThirdPartyToken
