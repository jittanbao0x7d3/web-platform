import React, { createContext, useContext, useEffect, useState } from "react"

type MovieContextType = {
  movieIds: string[]
  movieHistoryIds: string[]
  addMovieId: (movieId: string) => void
  addMovieHistoryId: (id: string) => void
  removeMovieId: (id: string) => void
  clearMovieIds: () => void

  searchMode: string
  setSearchMode: (mode: string) => void

  searchResponse: any[]
  setSearchResponse: React.Dispatch<any>
}

const MovieContext = createContext<MovieContextType | undefined>(undefined)

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [movieIds, setMovieIds] = useState<string[]>([])
  const [movieHistoryIds, setMovieHistoryIds] = useState<string[]>([])
  const [searchMode, setSearchMode] = useState("llm")
  const [searchResponse, setSearchResponse] = useState<any[]>([])

  // Ensure this runs only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("movieIds")
      // @ts-ignore
      setMovieIds(stored ? JSON.parse(stored) : [])

      const historyStored = localStorage.getItem("movieHistoryIds")
      // @ts-ignore
      setMovieHistoryIds(historyStored ? JSON.parse(historyStored) : [])
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("movieIds", JSON.stringify(movieIds))
      localStorage.setItem("movieHistoryIds", JSON.stringify(movieHistoryIds))
    }
  }, [movieIds, movieHistoryIds])

  const addMovieHistoryId = (newId: string) => {
    const newMovies = movieHistoryIds.filter((id) => id !== newId)
    setMovieHistoryIds([newId, ...newMovies])
  }

  const addMovieId = (newId: string) => {
    const newMovies = movieIds.filter((id) => id !== newId)
    setMovieIds([newId, ...newMovies])
  }

  const removeMovieId = (id: string) => {
    setMovieIds((prev) => prev.filter((movieId) => movieId !== id))
  }

  const clearMovieIds = () => {
    setMovieIds([])
  }

  return (
    <MovieContext.Provider
      value={{
        movieIds,
        movieHistoryIds,
        addMovieId,
        addMovieHistoryId,
        removeMovieId,
        clearMovieIds,
        searchMode,
        setSearchMode,
        searchResponse,
        setSearchResponse,
      }}
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
