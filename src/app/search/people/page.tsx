"use client"
import { useRouter } from "next/navigation"
import * as React from "react"
import { useMovieContext } from "@/contexts/MoviesContext"

export default function Web() {
  const { searchResponse } = useMovieContext()
  const router = useRouter()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {searchResponse.map((person) => (
        <div
          key={person.id}
          onClick={() => router.push(`/casts/${person.id}`)}
          className="cursor-pointer overflow-hidden rounded-lg bg-gray-700 object-cover transition-transform hover:scale-105"
        >
          <img
            src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
            alt={person.name}
            className=" w-full object-cover"
          />
          <div className="p-2">
            <p className="truncate text-xl font-semibold text-white">
              {person.name} ({person.birthday})
            </p>
            <p className="truncate text-xs text-gray-300">{person.character}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
