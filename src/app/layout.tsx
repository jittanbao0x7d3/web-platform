"use client"
import "../styles/tailwind.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Footer from "@/components/Footer"
import { NavBar } from "@/components/NavBar"
import { MovieProvider } from "@/contexts/MoviesContext"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState<"favorite" | "movies" | "history">("movies")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()

  const handleLogin = () => {
    // Simulate a login action
    console.log("Logging in...")
    router.push("/login")
  }

  const handleLogout = () => {
    // Simulate a logout action
    console.log("Logging out...")
    localStorage.removeItem("token")
  }

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <MovieProvider>
            <NavBar
              isLoggedIn={isLoggedIn}
              setCurrentTab={setCurrentTab}
              currentTab={currentTab}
              handleLogin={handleLogin}
              handleLogout={handleLogout}
            />
            {children}
            <Footer />
          </MovieProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
