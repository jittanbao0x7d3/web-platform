import { useRouter } from "next/navigation"
import React from "react"
import { FaHeart, FaStar } from "react-icons/fa"
import { toast } from "sonner"
import { useMovieContext } from "@/contexts/MoviesContext"
import { baseImageUri } from "@/lib/utils/axios.tmdb"

const MovieCard = ({ movie, path }: any) => {
  const { addMovieHistoryId, addMovieId } = useMovieContext()
  const router = useRouter()

  const handleAddMovie = async (path: string) => {
    const userId = localStorage.getItem("userId")
    const token = localStorage.getItem("token")
    if (userId && token) {
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId, movieId: path }),
      })
      const data = await response.json()

      if (data.movieIds) {
        toast("Movie added to favorites")
      } else {
        toast("Failed to add movie to favorites")
      }
    } else {
      toast("Please login to add movie to favorites")
    }
  }

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
              addMovieHistoryId(path)
              router.push(`/${path}`)
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
                handleAddMovie(path)
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
