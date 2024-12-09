import * as React from "react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<any>("")

  return (
    <div className="mb-8">
      <div className="relative mx-auto max-w-md">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg bg-gray-700 px-4 py-2 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>
    </div>
  )
}
