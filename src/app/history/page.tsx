"use client"

import React, { useEffect } from "react"
import MovieCard from "@/components/MovieCard"
import { useMovieContext } from "@/contexts/MoviesContext"
import { useQueryManyMovies } from "@/lib/hooks/useQueryMovie"
import { FaStar } from "react-icons/fa"

export default function Web() {
  const { movieHistoryIds } = useMovieContext()
  const [ratingHistory, setRatingHistory] = React.useState<any[]>([])

  const { isLoading, error, data: movies } = useQueryManyMovies({ body: movieHistoryIds })

  const fetchRatingHistory = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/ratings/user/${localStorage.getItem("userId")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      const data = await response.json()
      console.log("Rating history:", data)
      setRatingHistory(data)
    } catch (error) {
      console.error("Error fetching rating history:", error)
    }
  }

  useEffect(() => {
    fetchRatingHistory()
  }, [])

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white">Rating History</h1>
        {ratingHistory.length > 0 ? (
          <div className="mt-4 flex flex-col gap-4">
            {ratingHistory.map((rating: any, index: number) => (
              <div key={index} className="rounded-lg bg-gray-800 p-4 shadow-lg">
                <h3 className="mb-2 text-xl font-bold text-white">{rating.movieTitle}</h3>
                <div className="mb-2 flex items-center">
                  <span className="text-xl text-white">Rating: {rating.rating}</span>
                  <FaStar className="ml-1 text-yellow-400" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-white">No rating history.</p>
        )}

        <h1 className="my-8 text-2xl font-bold text-white">Movie History</h1>
        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading movies.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {movies?.map((movie: any, index: number) => (
              <MovieCard key={movie.id} movie={movie} path={movieHistoryIds[index]} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
