import React, { createContext, useContext, useEffect, useState } from "react"

type MovieContextType = {
  movieIds: number[]
  movieHistoryIds: number[]
  addMovieId: (movieId: number) => void
  addMovieHistoryId: (id: number) => void
  removeMovieId: (id: number) => void
  clearMovieIds: () => void
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movieIds, setMovieIds] = useState<number[]>([])
  const [movieHistoryIds, setMovieHistoryIds] = useState<number[]>([])

  // Ensure this runs only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("movieIds")
      setMovieIds(stored ? JSON.parse(stored) : [])

      const historyStored = localStorage.getItem("movieHistoryIds")
      setMovieHistoryIds(historyStored ? JSON.parse(historyStored) : [])
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("movieIds", JSON.stringify(movieIds))
      localStorage.setItem("movieHistoryIds", JSON.stringify(movieHistoryIds))
    }
  }, [movieIds])

  const addMovieHistoryId = (newId: number) => {
    const newMovies = movieHistoryIds.filter((id) => id !== newId)
    setMovieHistoryIds([newId, ...newMovies])
  }

  const addMovieId = (newId: number) => {
    const newMovies = movieIds.filter((id) => id !== newId)
    setMovieIds([newId, ...newMovies])
  }

  const removeMovieId = (id: number) => {
    setMovieIds((prev) => prev.filter((movieId) => movieId !== id))
  }

  const clearMovieIds = () => {
    setMovieIds([])
  }

  return (
    <MovieContext.Provider
      value={{ movieIds, movieHistoryIds, addMovieId, addMovieHistoryId, removeMovieId, clearMovieIds }}
    >
      {children}
    </MovieContext.Provider>
  )
}

export const useMovieContext = () => {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider")
  }
  return context
}
