import axios from "axios"

export const baseImageUri = "https://media.themoviedb.org/t/p/w533_and_h300_bestv2"
export const baseLandscapeImageUri = "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2"

const tmdbClient = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
})

tmdbClient.interceptors.request.use(
  (config) => {
    const token = process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

tmdbClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response || error.message)
    return Promise.reject(error)
  }
)

export default tmdbClient
