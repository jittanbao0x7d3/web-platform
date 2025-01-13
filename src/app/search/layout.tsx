"use client"
import * as React from "react"
import { PropsWithChildren } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { FaSearch } from "react-icons/fa"

export default function Web({ children }: PropsWithChildren) {
  const { register, handleSubmit } = useForm<{ query: string }>({})
  const onSubmit: SubmitHandler<{ query: string }> = (data) => console.log(data.query)

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="relative mx-auto max-w-2xl cursor-pointer">
          <form onSubmit={handleSubmit(onSubmit)} className="relative mx-auto w-full">
            <div className="relative">
              <input
                type="text"
                placeholder={"Ask me a question..."}
                className="w-full rounded-lg bg-gray-800 px-4 py-3 pl-10 text-lg text-white focus:outline-none "
                {...register("query")}
              />
              <FaSearch className="absolute left-3 top-4 text-gray-400" />

              <button
                type="submit"
                className="absolute right-3 top-2 rounded-lg bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700 focus:outline-none"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {children}
      </div>
    </div>
  )
}
