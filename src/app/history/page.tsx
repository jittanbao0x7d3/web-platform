"use client"

import React from "react";
import MovieCard from "@/components/MovieCard";
import {useQuery} from "@tanstack/react-query";
import tmdbClient from "@/lib/utils/axios.tmdb";
import {useMovieContext} from "@/contexts/MoviesContext";

export default function Web() {
  const useMoviesFromIds = () => {
    const { movieHistoryIds } = useMovieContext();

    return useQuery({
      queryKey: ["MOVIE_HISTORY_LIST_BY_IDS", movieHistoryIds],
      queryFn: async () => {
        if (movieHistoryIds.length === 0) return [];

        const fetchMovieDetails = async (id: number) => {
          const response = await tmdbClient.get(`/movie/${id}`, {
            params: { language: "vi-VN" },
          });
          return response.data;
        };

        const promises = movieHistoryIds.map((id) => fetchMovieDetails(id));
        return Promise.all(promises);
      },
      enabled: movieHistoryIds.length > 0, // Prevents fetching when there are no IDs
    });
  };
  const { data: movies, isLoading, error } = useMoviesFromIds();

  return (
      <div className="min-h-screen bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
              <p className="text-center text-white">Loading...</p>
          ) : error ? (
              <p className="text-center text-red-500">Error loading movies.</p>
          ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                {movies?.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
              </div>
          )}
        </div>
      </div>
  )
}
