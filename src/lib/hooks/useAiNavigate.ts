import { useMutation } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { aixios } from "@/lib/utils/axios"

export const enum RouteResponse {
  HOME_PAGE = "HOME_PAGE",
  PROFILE_PAGE = "PROFILE_PAGE",
  SEARCH_PAGE = "SEARCH_PAGE",
  CAST_PAGE = "CAST_PAGE",
  MOVIE_PAGE = "MOVIE_PAGE",
  GENRE_PAGE = "GENRE_PAGE",
  NONE = "NONE",
}

interface Response {
  status: number
  data: {
    route: RouteResponse
    params?: object
    metadata?: object
  }
}

export const useAiNavigate = () => {
  return useMutation<AxiosResponse<Response>, any, string>({
    mutationFn: (query: string) => {
      return aixios.post<Response>("/navigate", {
        query,
      })
    },
  })
}
