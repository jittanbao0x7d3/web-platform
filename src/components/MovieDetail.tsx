"use client"
import { join } from "lodash"
import { useRouter } from "next/navigation"
import React from "react"
import { FaArrowLeft, FaCalendarAlt, FaStar } from "react-icons/fa"
import { useQueryMovie } from "@/lib/hooks/useQueryMovie"
import { baseLandScapeImageUri } from "@/lib/utils/axios.tmdb"

export function MovieDetail({ movie, similar }) {
  const router = useRouter()

  const genresList = join(movie?.genres, "_")
  const queryGenres = useQueryMovie({
    url: `movie-genres/${genresList}`,
    key: ["GENRES_LIST", genresList],
    params: {},
  })

  if (!movie) {
    return
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <button
        onClick={() => router.push("/")}
        className="mb-6 flex items-center text-white transition-colors hover:text-blue-400"
      >
        <FaArrowLeft className="mr-2" /> Back to Movies
      </button>
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden rounded-lg bg-gray-800 shadow-xl">
          <div className="md:flex">
            <div className="h-auto md:w-1/3">
              <img src={baseLandScapeImageUri + movie.poster_path} alt={movie.title} className="object-cover" />
            </div>
            <div className="p-6 md:w-2/3">
              <h2 className="mb-4 text-3xl font-bold text-white">{movie.title}</h2>
              <div className="mb-4 flex items-center space-x-4">
                <div className="flex items-center">
                  <FaStar className="mr-1 text-yellow-400" />
                  <span className="text-white">{movie.vote_average}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaCalendarAlt className="mr-1" />
                  <span>{movie.release_date}</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-xl font-semibold text-white">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {queryGenres?.data?.map((genre) => (
                    <span key={genre.name} className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-xl font-semibold text-white">Synopsis</h3>
                <p className="text-gray-300">{movie.overview}</p>
              </div>

              {similar.length > 0 && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-white">Similar Movies</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {similar.map((movie) => (
                      <div
                        key={movie.id}
                        onClick={() => router.push(`/${movie.id}`)}
                        className="cursor-pointer overflow-hidden rounded-lg bg-gray-700 transition-opacity hover:opacity-75"
                      >
                        <img src={movie.poster_url} alt={movie.title} className="h-48 w-full object-cover" />
                        <div className="p-2">
                          <p className="truncate text-sm font-semibold text-white">{movie.title}</p>
                          <div className="flex items-center">
                            <FaStar className="mr-1 text-xs text-yellow-400" />
                            <span className="text-xs text-gray-300">{movie.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
