"use client"

import { Banana } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import * as React from "react"
import { FaHeart, FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa"
import { toast } from "sonner"
import { useMovieContext } from "@/contexts/MoviesContext"

type Props = {
  isLoggedIn: boolean
  currentTab: "favorite" | "movies" | "history"

  setCurrentTab: (target: "favorite" | "movies" | "history") => void
  handleLogin: CallableFunction
  handleLogout: CallableFunction
}

export function NavBar({ currentTab, setCurrentTab, handleLogin, handleLogout }: Props) {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = React.useState(false)
  const { searchMode, setSearchMode } = useMovieContext()

  // Check if user is logged in

  React.useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="flex text-white">
          <Link className="text-2xl font-bold" href="/">
            MovieApp
          </Link>
          <button
            className={` flex rounded-md px-3 py-2 text-white hover:bg-gray-700`}
            onClick={() => {
              if (searchMode === "llm") {
                setSearchMode("")
                toast("Switched to normal mode")
              } else {
                setSearchMode("llm")
                toast("Switched to AI mode")
              }
            }}
          >
            <Banana />
            Use AI mode
          </button>
        </h1>

        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => {
                  router.push("/")
                  setCurrentTab("movies")
                }}
                className={`rounded-md px-3 py-2 text-white ${
                  currentTab === "movies" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => {
                  router.push("/history")
                  setCurrentTab("history")
                }}
                className={`flex items-center rounded-md px-3 py-2 text-white ${
                  currentTab === "history" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                <FaHistory className="mr-2" /> History
              </button>
              <button
                onClick={() => {
                  router.push("/favorite")
                  setCurrentTab("favorite")
                }}
                className={`flex items-center rounded-md px-3 py-2 text-white ${
                  currentTab === "favorite" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                <FaHeart className="mr-2" /> Favorites
              </button>
              <button
                onClick={() => {
                  handleLogout()
                  router.refresh()
                }}
                className="flex items-center rounded-md px-3 py-2 text-white hover:bg-gray-700"
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => handleLogin()}
              className="flex items-center rounded-md px-3 py-2 text-white hover:bg-gray-700"
            >
              <FaUser className="mr-2" /> Login
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
