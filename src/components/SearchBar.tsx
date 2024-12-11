import * as React from "react"
import { useState } from "react"
import { FaSearch } from "react-icons/fa"

export function SearchBar({ onSearch }: { onSearch: (query: string) => void }) {
  const [searchQuery, setSearchQuery] = useState<string>("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchQuery.trim()) // Pass the trimmed query to the parent
  }

  return (
    <div className="mb-8">
      <form onSubmit={handleSearch} className="relative mx-auto max-w-md">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg bg-gray-700 px-4 py-2 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <button
          type="submit"
          className="absolute right-3 top-1 rounded-lg bg-blue-600 px-3 py-1 text-white hover:bg-blue-700 focus:outline-none"
        >
          Search
        </button>
      </form>
    </div>
  )
}
