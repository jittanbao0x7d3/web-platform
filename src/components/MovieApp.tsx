import { useQuery } from "@tanstack/react-query"
import React, { useState } from "react"
import MovieCard from "@/components/MovieCard";
import { SearchBar } from "@/components/SearchBar"
import tmdbClient from "@/lib/utils/axios.tmdb"

const MovieApp = () => {
  const [filter, setFilter] = useState<string>("today")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const query = useQuery<any, any, { page: number; results: any[] }>({
    queryKey: ["MOVIE_LIST", filter, searchQuery],
    queryFn: async () => {
      const endpoint = searchQuery
        ? "/search/movie" // Search endpoint when query is present
        : filter === "today"
        ? "/trending/movie/day"
        : "/trending/movie/week"

      const params = searchQuery ? { query: searchQuery, language: "vi-VN" } : { language: "vi-VN" }

      const data = await tmdbClient.get(endpoint, { params })
      return data.data
    },
  })

  const handleSearch = (query: string) => {
    setSearchQuery(query)
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-4xl font-bold text-white">Trending Movies</h1>
        <SearchBar onSearch={handleSearch} />
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => setFilter("today")}
            className={`rounded-md px-4 py-2 ${
              filter === "today" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilter("week")}
            className={`rounded-md px-4 py-2 ${
              filter === "week" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
            }`}
          >
            This Week
          </button>
        </div>
        {query.isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : query.isError ? (
          <p className="text-center text-red-500">Error loading movies.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {query.data?.results?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieApp
