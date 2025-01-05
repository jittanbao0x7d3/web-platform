"use client"
import "../styles/tailwind.css"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { NavBar } from "@/components/NavBar"
import {MovieProvider} from "@/contexts/MoviesContext";
import Footer from "@/components/Footer";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      retry: false,
    },
  },
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [currentTab, setCurrentTab] = useState<"favorites" | "movies" | "history">("movies")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <MovieProvider>
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
            <Footer />
          </MovieProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}
