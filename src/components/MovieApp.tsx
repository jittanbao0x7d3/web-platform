import Autoplay from "embla-carousel-autoplay"
import React, { useState } from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/Carousel"
import MovieCard from "@/components/MovieCard"
import { SearchBar } from "@/components/SearchBar"
import { useMovieContext } from "@/contexts/MoviesContext"
import { useQueryMovie } from "@/lib/hooks/useQueryMovie"
import { useSearch } from "@/lib/hooks/useSearch"
import { basePortraitImageUri } from "@/lib/utils/axios.tmdb"

const options = [
  {
    key: "today",
    value: "Trending Today",
  },
  {
    key: "week",
    value: "Trending This Week",
  },
  {
    key: "popular",
    value: "Popular",
  },
  {
    key: "topRated",
    value: "Top Rated",
  },
  {
    key: "upcoming",
    value: "Upcoming",
  },
]

const urlMapper = {
  today: "movies-trending-day",
  week: "movie-trending-week",
  popular: "movies-popular",
  topRated: "movies-top-rated",
  upcoming: "movie-upcoming",
}

const MovieApp = () => {
  const [filter, setFilter] = useState<string>("today")
  const { searchMode } = useMovieContext()

  const { mutate, isPending } = useSearch()

  const query = useQueryMovie({
    key: ["MOVIE_LIST", filter],
    url: urlMapper[filter],
    params: {
      limit: 10,
      page: 1,
    },
  })

  const nowPlayingQuery = useQueryMovie({
    key: ["NOW_PLAYING"],
    url: "movies-now-playing",
    params: {},
  })

  const handleSearch = async (query: string) => {
    mutate({
      query,
      type: searchMode,
    })
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <SearchBar onSearch={handleSearch} isLoading={isPending} />

        <div className="my-5 min-h-36 w-full">
          <Carousel
            plugins={[
              Autoplay({
                delay: 5000,
              }),
            ]}
            className="flex items-center"
          >
            <CarouselContent>
              {nowPlayingQuery.data?.map((movie: any) => (
                <CarouselItem key={movie.title} className="flex w-full flex-col items-center px-24">
                  <p className="p-2 text-4xl text-white">{movie.original_title}</p>
                  <img
                    src={basePortraitImageUri + movie.backdrop_path}
                    alt={movie.title}
                    className="w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="mb-8 flex justify-center gap-4">
          {options.map(({ key, value }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`rounded-md px-4 py-2 ${
                filter === key ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
              }`}
            >
              {value}
            </button>
          ))}
        </div>
        {query.isLoading ? (
          <p className="text-center text-white">Loading...</p>
        ) : query.isError ? (
          <p className="text-center text-red-500">Error loading movies.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
            {query.data?.map((movie) => (
              <MovieCard key={movie._id} path={`${urlMapper[filter]}_${movie._id}`} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MovieApp
