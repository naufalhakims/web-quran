'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import SearchBar from './SearchBar'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 bg-green-600 text-white p-4 z-50">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            Quran Website
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            <nav>
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/random" className="hover:underline">
                    Random Ayah
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="mt-4 md:hidden">
            <SearchBar />
            <nav className="mt-4">
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/random" className="block hover:underline" onClick={() => setIsMenuOpen(false)}>
                    Random Ayah
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

