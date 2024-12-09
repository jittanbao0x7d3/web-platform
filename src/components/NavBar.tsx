// @flow
import * as React from "react"
import { FaHeart, FaHistory, FaSignOutAlt, FaUser } from "react-icons/fa"

type Props = {
  isLoggedIn: boolean
  currentTab: "favorites" | "movies" | "history"

  setCurrentTab: (target: "favorites" | "movies" | "history") => void
  handleLogin: CallableFunction
  handleLogout: CallableFunction
}

export function NavBar({ isLoggedIn, currentTab, setCurrentTab, handleLogin, handleLogout }: Props) {
  return (
    <nav className="bg-gray-800 p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">MovieApp</h1>
        <div className="flex items-center space-x-4">
          {isLoggedIn ? (
            <>
              <button
                onClick={() => setCurrentTab("movies")}
                className={`rounded-md px-3 py-2 text-white ${
                  currentTab === "movies" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setCurrentTab("history")}
                className={`flex items-center rounded-md px-3 py-2 text-white ${
                  currentTab === "history" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                <FaHistory className="mr-2" /> History
              </button>
              <button
                onClick={() => setCurrentTab("favorites")}
                className={`flex items-center rounded-md px-3 py-2 text-white ${
                  currentTab === "favorites" ? "bg-blue-600" : "hover:bg-gray-700"
                }`}
              >
                <FaHeart className="mr-2" /> Favorites
              </button>
              <button
                onClick={() => handleLogout()}
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
