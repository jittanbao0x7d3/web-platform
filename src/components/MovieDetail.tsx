"use client"
import { join } from "lodash"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import { FaArrowLeft, FaCalendarAlt, FaStar } from "react-icons/fa"
import { useQueryMovie } from "@/lib/hooks/useQueryMovie"
import { baseLandScapeImageUri } from "@/lib/utils/axios.tmdb"

export function MovieDetail({ movie, similar }) {
  const router = useRouter()
  const [reviews, setReviews] = useState([])
  const [rating, setRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [averageRating, setAverageRating] = useState(0)
  const [totalVotes, setTotalVotes] = useState(0)

  const fetchReviews = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/reviews/${window.location.pathname.split("/")[1]}`,
        {
          method: "GET",
        }
      )

      const resp: any = await response.json()
      console.log(resp)
      setReviews(resp)
    } catch (err: any) {
      alert(err.message || "Something went wrong.")
    }
  }

  const fetchRating = async () => {
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_BASE_URL + `/ratings/${window.location.pathname.split("/")[1]}`,
        {
          method: "GET",
        }
      )

      const resp: any = await response.json()
      console.log(resp)
      // TODO: calulate average rating
      const average = resp.reduce((acc, curr) => acc + curr.rating, 0) / resp.length
      setAverageRating(average)
      setTotalVotes(resp.length)
    } catch (err: any) {
      alert(err.message || "Something went wrong.")
    }
  }

  useEffect(() => {
    fetchReviews()
    fetchRating()
  }, [])

  const handleReviewSubmit = async (e) => {
    e.preventDefault()
    try {
      // Call the API
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          name: localStorage.getItem("name"),
          movieId: window.location.pathname.split("/")[1],
          review: reviewText,
        }),
      })

      const resp: any = await response.json()
      if (resp.status === "error") {
        alert(resp.message)
        return
      }

      await fetchReviews()
      setReviewText("")
    } catch (err: any) {
      alert(err.message || "Something went wrong.")
    }
  }

  const handleRatingSubmit = async (e) => {
    e.preventDefault()
    try {
      // Call the API
      const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          userId: localStorage.getItem("userId"),
          movieId: window.location.pathname.split("/")[1],
          rating: rating,
        }),
      })

      const resp: any = await response.json()
      if (resp.status === "error") {
        alert(resp.message)
        return
      }

      alert("Rating submitted successfully!")
    } catch (err: any) {
      alert(err.message || "Something went wrong.")
    }
  }

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

              <div className="flex items-center gap-2">
                <span className="text-xl font-semibold text-white">Average Rating: {averageRating.toFixed(2)}</span>
                <FaStar className="ml-1 text-yellow-400" />
                <span className="text-xl font-semibold text-white">Total Votes: {totalVotes}</span>
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

        <div className="mt-6">
          {/* Form for Rating */}
          <form onSubmit={handleRatingSubmit} className="mb-6">
            <div className="mb-4">
              <div className="flex items-center gap-4">
                <label className="block text-xl font-semibold text-white">Rate This Movie</label>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                    <FaStar
                      key={star}
                      className={`cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-400"} mr-1 text-xl`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
                {/* Show average and total vote */}
              </div>
            </div>
            <button type="submit" className="bg-blue-500 px-4 py-2 text-white">
              Submit Rating
            </button>
          </form>

          {/* Form for Review */}
          <form onSubmit={handleReviewSubmit} className="mb-6">
            <div className="mb-4">
              <label className="mb-2 block text-xl font-semibold text-white">Leave a Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full bg-gray-800 p-2 text-white"
                placeholder="Write your review here..."
              />
            </div>
            <button type="submit" className="bg-blue-500 px-4 py-2 text-white">
              Submit Review
            </button>
          </form>

          {/* Display Reviews */}
          <div>
            <h3 className="mb-4 text-2xl font-semibold text-white">Reviews</h3>
            {reviews.length > 0 ? (
              reviews?.map((review) => (
                <div key={review._id} className="mb-4 rounded bg-gray-700 p-4">
                  <h4 className="text-xs font-semibold text-white">{review.name}</h4>
                  <p className="text-white">{review.review}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No reviews yet. Be the first to leave a review!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
