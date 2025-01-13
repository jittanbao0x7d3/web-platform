"use client"

import { useParams, useRouter } from "next/navigation"
import React, { useEffect } from "react"

const ThirdPartyToken = () => {
  const router = useRouter()
  const { token } = useParams()

  useEffect(() => {
    if (token) {
      if (typeof token === "string") {
        localStorage.setItem("token", token)
      }
      router.push("/")
    } else {
      router.push("/login")
      alert("Invalid token")
    }
  }, [router, token])

  return (
    <div>
      <h1>Processing token...</h1>
    </div>
  )
}

export default ThirdPartyToken
