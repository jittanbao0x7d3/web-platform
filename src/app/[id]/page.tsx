"use client"
import { useParams } from "next/navigation"
import * as React from "react"
import { useEffect } from "react"
import { MovieDetail } from "@/components/MovieDetail"
import { useMovieContext } from "@/contexts/MoviesContext"
import { useQueryMovie } from "@/lib/hooks/useQueryMovie"

export default function Page() {
  const { id } = useParams()
  const { addMovieHistoryId } = useMovieContext()
  const [path, ref] = (id as string)?.split("_")

  const movieDetail = useQueryMovie({
    url: `${path}/${ref}`,
    params: {},
    // @ts-ignore
    key: ["MOVIE_DETAIL", `${path}/${ref}`],
  })

  useEffect(() => {
    addMovieHistoryId(id as string)
  }, [])

  // Handle loading and error states
  if (movieDetail.isLoading || movieDetail.isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="size-32 animate-spin rounded-full border-b-2 border-blue-500"></div>
      </div>
    )
  }

  // Render MovieDetail component
  return <MovieDetail movie={movieDetail.data} similar={[]} />
}
