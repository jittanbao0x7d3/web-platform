"use client"
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"
import * as React from "react"
import { MovieDetail } from "@/components/MovieDetail"
import tmdbClient, { baseImageUri } from "@/lib/utils/axios.tmdb"

export default function Page() {
  const router = useRouter()
  const { id } = useParams()

  // Fetch movie details
  const movieQuery = useQuery({
    queryKey: ["MOVIE_DETAILS", id],
    queryFn: async () => {
      const response = await tmdbClient.get(`/movie/${id}`, {
        params: { language: "vi-VN" },
      })
      const data = response.data
      return {
        title: data.title,
        rating: data.vote_average,
        releaseDate: data.release_date,
        genres: data.genres.map((genre) => genre.name),
        synopsis: data.overview,
        posterUrl: baseImageUri + data.poster_path,
      }
    },
    enabled: !!id, // Only fetch if `id` is available
  })

  // Fetch similar movies
  const similarMoviesQuery = useQuery({
    queryKey: ["SIMILAR_MOVIES", id],
    queryFn: async () => {
      const response = await tmdbClient.get(`/movie/${id}/similar`, {
        params: { language: "vi-VN" },
      })
      return response.data.results.map((movie: any) => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average,
        posterUrl: baseImageUri + movie.poster_path,
      }))
    },
    enabled: !!id, // Only fetch if `id` is available
  })

  // Handle loading and error states
  if (movieQuery.isLoading || similarMoviesQuery.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="size-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (movieQuery.isError || similarMoviesQuery.isError) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6">
        <div className="text-center text-white">
          <p className="mb-4 text-xl">
            {movieQuery.error?.message || similarMoviesQuery.error?.message || "An error occurred"}
          </p>
          <button onClick={() => router.push("/")} className="rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700">
            Back to Movies
          </button>
        </div>
      </div>
    )
  }

  // Render MovieDetail component
  return <MovieDetail movie={movieQuery.data} similar={similarMoviesQuery.data} />
}
