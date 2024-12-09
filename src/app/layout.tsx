"use client"
import "../styles/tailwind.css"
import { useState } from "react"
import { NavBar } from "@/components/NavBar"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState<"favorites" | "movies" | "history">("movies")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  return (
    <html lang="en">
      <body>
        <NavBar
          isLoggedIn={isLoggedIn}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          handleLogin={() => {
            setIsLoggedIn(true)
          }}
          handleLogout={() => {
            setIsLoggedIn(false)
          }}
        />
        {children}
      </body>
    </html>
  )
}
