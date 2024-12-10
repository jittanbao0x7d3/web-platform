import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import React, { useState } from "react"
import { FaStar } from "react-icons/fa"
import { SearchBar } from "@/components/SearchBar"
import tmdbClient, { baseImageUri } from "@/lib/utils/axios.tmdb"

const MovieApp = () => {
  const [filter, setFilter] = useState<string>("today")
  const [searchQuery, setSearchQuery] = useState<string>("")

  const query = useQuery<any, any, { page: number; results: any[] }>({
    queryKey: ["MOVIE_LIST", filter, searchQuery],
    queryFn: () => {
      const endpoint = searchQuery
        ? "/search/movie" // Search endpoint when query is present
        : filter === "today"
        ? "/trending/movie/day"
        : "/trending/movie/week"

      const params = searchQuery ? { query: searchQuery, language: "vi-VN" } : { language: "vi-VN" }

      return tmdbClient.get(endpoint, { params }).then((data) => data.data)
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

const MovieCard = ({ movie }: any) => {
  const router = useRouter()

  return (
    <div className="overflow-hidden rounded-lg bg-gray-800 shadow-lg transition-transform duration-200 hover:scale-105">
      <img src={baseImageUri + movie.backdrop_path} alt={movie.title} className="h-64 w-full object-cover" />
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold text-white">{movie.title}</h3>
        <p className="mb-2 text-gray-400">{movie.release_date}</p>
        <div className="mb-2 flex items-center">
          <FaStar className="mr-1 text-yellow-400" />
          <span className="text-white">{movie.vote_average}</span>
        </div>
        <button
          onClick={() => {
            router.push(`/${movie.id}`)
          }}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          View Details
        </button>
      </div>
    </div>
  )
}
