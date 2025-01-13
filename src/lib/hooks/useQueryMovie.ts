import { useQuery } from "@tanstack/react-query"
import axiosInstance from "@/lib/utils/axios"

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
