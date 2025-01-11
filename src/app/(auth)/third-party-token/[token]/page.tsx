"use client"

import { useRouter } from "next/navigation"
import React, { useEffect } from "react"

const ThirdPartyToken = ({ params }: { params: { token: string } }) => {
  const router = useRouter()

  useEffect(() => {
    const parseToken = () => {
      const token = params.token
      console.log(token)
      if (token) {
        localStorage.setItem("token", token)
        router.push("/")
      } else {
        router.push("/login")
        alert("Invalid token")
      }
    }

    parseToken()
  }, [])

  return (
    <div>
      <h1>Processing token...</h1>
    </div>
  )
}

export default ThirdPartyToken
