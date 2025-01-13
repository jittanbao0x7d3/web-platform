"use client"

import React, { useEffect } from "react"
import MovieCard from "@/components/MovieCard"
import { useMovieContext } from "@/contexts/MoviesContext"
import { useQueryManyMovies } from "@/lib/hooks/useQueryMovie"

const getFavoriteMovies = async () => {
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem("token")
  if (userId && token) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + `/favorites/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    const data = await response.json()
    // console.log(data)
    if (!data) {
      return []
    }

    if (data[0].movieIds) {
      return data[0].movieIds
    } else {
      return []
    }
  } else {
    return []
  }
}

export default function Web() {
  const [favoriteMovies, setFavoriteMovies] = React.useState([])

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const movieIds = await getFavoriteMovies()
      setFavoriteMovies(movieIds)
    }
    fetchFavoriteMovies()
  }, [])

  const { isLoading, error, data: movies } = useQueryManyMovies({ body: favoriteMovies })
  console.log(movies)

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">Error loading movies.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {movies?.map((movie: any, index: number) => (
              <MovieCard key={movie.id} movie={movie} path={favoriteMovies[index]} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
