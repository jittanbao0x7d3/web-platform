import { useQuery } from "@tanstack/react-query"
import { axiosInstance } from "@/lib/utils/axios"

interface Option {
  url: string
  key: string[]
  params: {
    page?: number
    limit?: number
    search?: string
  }
}

export const useQueryMovie = (option: Option) => {
  const { url, key, params } = option
  return useQuery({
    queryKey: key,
    queryFn: async () => {
      const data = await axiosInstance.get(url, {
        params,
      })

      return data.data
    },
  })
}

export const useQueryManyMovies = (option: { body: string[] }) => {
  return useQuery({
    queryKey: ["QUERY_LIST_FUCKING_MOVIE", option.body],
    queryFn: async () => {
      const data = await axiosInstance.post("/movies/find-many", {
        path: option.body,
      })

      return data.data
    },
  })
}
