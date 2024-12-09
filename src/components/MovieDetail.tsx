"use client"
import { useRouter } from "next/navigation"
import * as React from "react"
import { FaArrowLeft, FaCalendarAlt, FaClock, FaStar } from "react-icons/fa"

type Props = {
  isLoading: boolean
  error?: string

  movie: any
  cast: any
  similar: any
  movieDetails: {
    runtime: number
  }
}

export function MovieDetail({ isLoading, error, movie, cast, similar, movieDetails }: Props) {
  const router = useRouter()

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="size-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900 p-6">
        <div className="text-center text-white">
          <p className="mb-4 text-xl">{error}</p>
          <button className="rounded-md bg-blue-600 px-4 py-2 hover:bg-blue-700">Back to Movies</button>
        </div>
      </div>
    )
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
            <div className="md:w-1/3">
              <img src={movie.posterUrl} alt={movie.title} className="size-full object-cover" />
            </div>
            <div className="p-6 md:w-2/3">
              <h2 className="mb-4 text-3xl font-bold text-white">{movie.title}</h2>
              <div className="mb-4 flex items-center space-x-4">
                <div className="flex items-center">
                  <FaStar className="mr-1 text-yellow-400" />
                  <span className="text-white">{movie.rating}</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <FaCalendarAlt className="mr-1" />
                  <span>{movie.releaseDate}</span>
                </div>
                {movieDetails?.runtime && (
                  <div className="flex items-center text-gray-300">
                    <FaClock className="mr-1" />
                    <span>{movieDetails.runtime} min</span>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="mb-2 text-xl font-semibold text-white">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span key={genre} className="rounded-full bg-blue-600 px-3 py-1 text-sm text-white">
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="mb-2 text-xl font-semibold text-white">Synopsis</h3>
                <p className="text-gray-300">{movie.synopsis}</p>
              </div>

              {cast.length > 0 && (
                <div className="mb-6">
                  <h3 className="mb-4 text-xl font-semibold text-white">Cast</h3>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                    {cast.map((actor) => (
                      <div key={actor.id} className="text-center">
                        <img
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                          alt={actor.name}
                          className="mx-auto mb-2 size-24 rounded-full object-cover"
                        />
                        <p className="text-sm text-white">{actor.name}</p>
                        <p className="text-xs text-gray-400">{actor.character}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {similar.length > 0 && (
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-white">Similar Movies</h3>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {similar.map((movie) => (
                      <div
                        key={movie.id}
                        className="cursor-pointer overflow-hidden rounded-lg bg-gray-700 transition-opacity hover:opacity-75"
                      >
                        <img src={movie.posterUrl} alt={movie.title} className="h-48 w-full object-cover" />
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
