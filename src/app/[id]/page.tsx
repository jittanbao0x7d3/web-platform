"use client"
import { useQuery } from "@tanstack/react-query"
import * as React from "react"
import { MovieDetail } from "@/components/MovieDetail"
import tmdbClient from "@/lib/utils/axios.tmdb"

export default function Page() {
  const query = useQuery<any, any, { page: number; results: any[] }>({
    queryKey: ["MOVIE_LIST"],
    queryFn: () => {
      return tmdbClient.get("/movie/popular", {
        params: {
          page: 1,
          language: "vi-VN",
        },
      })
    },
  })

  return (
    <MovieDetail
      isLoading={query.isLoading}
      movie={query.data?.results}
      error={query.error?.message}
      similar={query.data?.results.slice(0, 2)}
    />
  )
}
