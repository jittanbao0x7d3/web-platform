import * as React from "react"
import { MovieDetail } from "@/components/MovieDetail"

const dummyMovies = [
  {
    id: 1,
    title: "The Epic Journey",
    releaseYear: 2024,
    rating: 4.5,
    genres: ["Action", "Adventure"],
    synopsis: "An epic tale of adventure and discovery across unknown lands.",
    posterUrl: "https://images.unsplash.com/photo-1536440136628-849c177e76a1",
    releaseDate: "2024-03-15",
  },
  {
    id: 2,
    title: "Midnight Mystery",
    releaseYear: 2024,
    rating: 4.8,
    genres: ["Thriller", "Mystery"],
    synopsis: "A gripping mystery unfolds in the dark streets of a sleeping city.",
    posterUrl: "https://images.unsplash.com/photo-1535016120720-40c646be5580",
    releaseDate: "2024-02-28",
  },
  {
    id: 3,
    title: "Love in Paris",
    releaseYear: 2024,
    rating: 4.2,
    genres: ["Romance", "Drama"],
    synopsis: "A romantic tale set in the heart of the city of love.",
    posterUrl: "https://images.unsplash.com/photo-1502899576159-f224dc2349fa",
    releaseDate: "2024-01-20",
  },
]

export default function Page() {
  return (
    <MovieDetail
      movie={{
        id: 3,
        title: "Love in Paris",
        releaseYear: 2024,
        rating: 4.2,
        genres: ["Romance", "Drama"],
        synopsis: "A romantic tale set in the heart of the city of love.",
        posterUrl: "https://images.unsplash.com/photo-1502899576159-f224dc2349fa",
        releaseDate: "2024-01-20",
      }}
      cast={[]}
      isLoading={false}
      movieDetails={{
        runtime: 120,
      }}
      similar={dummyMovies.slice(0, 2)}
    />
  )
}
