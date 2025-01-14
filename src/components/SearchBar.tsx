import * as Dialog from "@radix-ui/react-dialog"
import * as motion from "motion/react-client"
import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { FaSearch } from "react-icons/fa"
import { ButtonLoading } from "@/components/Button"

export function SearchBar({ onSearch, isLoading }: { onSearch: (query: string) => Promise<void>; isLoading: boolean }) {
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [open, setOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSearch(searchQuery.trim())
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.DialogTitle></Dialog.DialogTitle>
      <Dialog.Trigger asChild>
        <div className="mb-8">
          <div className="relative mx-auto max-w-md cursor-pointer">
            <input
              type="text"
              placeholder="Search movies... (⌘K)"
              className="w-full cursor-pointer rounded-lg bg-gray-700 px-4 py-2 pl-10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              readOnly
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              scale: { type: "spring", visualDuration: 0.1, bounce: 0 },
            }}
          >
            <form onSubmit={handleSearch} className="relative mx-auto">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={"Search movies"}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg bg-gray-800 px-4 py-3 pl-10 text-lg text-white focus:outline-none "
                />
                <FaSearch className="absolute left-3 top-4 text-gray-400" />

                <div className="absolute right-24 top-2 text-white"></div>

                <ButtonLoading
                  isLoading={isLoading}
                  type="submit"
                  className="absolute right-3 top-2 rounded-lg bg-blue-600 px-4 py-1.5 text-white hover:bg-blue-700 focus:outline-none"
                >
                  Search
                </ButtonLoading>
              </div>
            </form>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
