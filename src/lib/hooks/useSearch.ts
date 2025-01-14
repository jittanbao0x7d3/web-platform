import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useMovieContext } from "@/contexts/MoviesContext"
import { axiosInstance } from "@/lib/utils/axios"

interface SearchOptions {
  query: string
  type: string
}

interface Response {
  collection: "movies" | "people"
  navigateTo: string
  movies?: any[]
  people?: any[]
}

export const useSearch = () => {
  const router = useRouter()
  const { setSearchResponse } = useMovieContext()

  return useMutation({
    mutationFn: async (option: SearchOptions) => {
      const { query, type } = option
      const data = await axiosInstance.get("/movies/search", {
        params: {
          query,
          type,
          page: 1,
          limit: 10,
        },
      })

      return data.data as Response
    },
    onSuccess: ({ collection, movies, people }: Response) => {
      setSearchResponse(collection === "movies" ? movies : people)
      router.push(`/search/${collection}`)
    },
  })
}
