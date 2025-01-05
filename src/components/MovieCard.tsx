import { useRouter } from "next/navigation"
import { baseImageUri } from "@/lib/utils/axios.tmdb"
import { FaStar, FaHeart } from "react-icons/fa"
import React from "react"
import { useMovieContext } from "@/contexts/MoviesContext"

const MovieCard = ({ movie }: any) => {
  const { addMovieHistoryId, addMovieId } = useMovieContext()

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
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              addMovieHistoryId(movie.id)
              router.push(`/${movie.id}`)
            }}
            className="w-full rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            View Details
          </button>
          <div className="group relative">
            <div className="absolute -left-3 -top-10 mt-2 w-max -translate-x-1/2 rounded-md bg-gray-900 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
              Add to favorite
            </div>
            <button
              className="flex items-center justify-center rounded-full bg-gray-700 p-2 transition-colors hover:bg-gray-600"
              onClick={() => {
                addMovieId(movie.id)
              }}
            >
              <FaHeart className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
