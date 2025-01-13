"use client";

import React from "react";
import {useParams, useRouter} from "next/navigation";
import {useQueryPeople} from "@/lib/hooks/useQueryPeople";

const CastDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = useParams()

    const castQuery = useQueryPeople(id)

    if (castQuery.isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-xl font-semibold text-gray-600">Loading...</p>
            </div>
        );
    }

    if (!castQuery) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-100">
                <p className="text-xl font-semibold text-gray-600">Cast not found.</p>
            </div>
        );
    }

    const cast = castQuery.data

    return (
        <div className="min-h-screen bg-gray-900 p-6 text-white">
            <button
                onClick={() => router.back()}
                className="mb-6 flex items-center text-gray-400 transition-colors hover:text-blue-400"
            >
                Back
            </button>
            <div className="mx-auto max-w-4xl">
                <div className="flex flex-col items-center md:flex-row">
                    <div className="w-full max-w-xs overflow-hidden rounded-lg bg-gray-800 shadow-lg md:w-1/3">
                        <img
                            src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                            alt={cast.name}
                            className="object-cover"
                        />
                    </div>
                    <div className="mt-6 md:mt-0 md:ml-8 md:w-2/3">
                        <h1 className="text-3xl font-bold">{cast.name}</h1>
                        <p className="mt-2 text-sm text-gray-400">
                            {cast.place_of_birth} — {cast.birthday}
                            {cast.deathday && ` (Died: ${cast.deathday})`}
                        </p>
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">Known For</h2>
                            <p className="text-gray-300">{cast.known_for_department}</p>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-xl font-semibold">Biography</h2>
                            <p className="text-gray-300">{cast.biography}</p>
                        </div>
                        {cast.also_known_as.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">Also Known As</h2>
                                <ul className="list-disc pl-5 text-gray-300">
                                    {cast.also_known_as.map((alias: string) => (
                                        <li key={alias}>{alias}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        {cast.homepage && (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">Website</h2>
                                <a
                                    href={cast.homepage}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-400 hover:underline"
                                >
                                    {cast.homepage}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CastDetailPage;