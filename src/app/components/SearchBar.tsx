'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search surah..."
        className="pl-10 pr-4 py-2 rounded-full bg-green-700 text-white placeholder-green-200 focus:outline-none focus:ring-2 focus:ring-white"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-200" size={18} />
    </form>
  )
}

