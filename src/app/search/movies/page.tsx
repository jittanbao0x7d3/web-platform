"use client"
import * as React from "react"
import MovieCard from "@/components/MovieCard"
import { useMovieContext } from "@/contexts/MoviesContext"

export default function Web() {
  const { searchResponse } = useMovieContext()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {searchResponse.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  )
}
