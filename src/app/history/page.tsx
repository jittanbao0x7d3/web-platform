"use client"

import React from "react"
import MovieCard from "@/components/MovieCard"
import { useMovieContext } from "@/contexts/MoviesContext"
import { useQueryManyMovies } from "@/lib/hooks/useQueryMovie"

export default function Web() {
  const { movieHistoryIds } = useMovieContext()

  const { isLoading, error, data: movies } = useQueryManyMovies({ body: movieHistoryIds })

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading movies.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {movies?.map((movie: any) => <MovieCard key={movie.id} movie={movie} />)}
          </div>
        )}
      </div>
    </div>
  )
}
