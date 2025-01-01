'use client'

import { useState } from 'react'
import Link from 'next/link'
import AudioPlayer from './AudioPlayer'

interface Ayah {
  number: {
    inQuran: number
    inSurah: number
  }
  arab: string
  translation: string
  audio: {
    alafasy: string
  }
  tafsir: {
    kemenag: {
      short: string
      long: string
    }
    quraish: string
  }
}

interface Surah {
  number: number
  numberOfAyahs: number
  name: string
  translation: string
  revelation: string
  description: string
  bismillah: {
    arab: string
    translation: string
  }
  ayahs: Ayah[]
}

export default function SurahDetail({ surah }: { surah: Surah }) {
  const [activeAyah, setActiveAyah] = useState<number | null>(null)

  const handlePlay = (ayahNumber: number) => {
    setActiveAyah(ayahNumber)
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-4">{surah.name} ({surah.translation})</h1>
      <p className="text-gray-600 mb-4">{surah.revelation} • {surah.numberOfAyahs} Ayat</p>
      <p className="text-gray-700 mb-6">{surah.description}</p>
      
      <h2 className="text-2xl font-semibold mb-4">Bismillah</h2>
      <p className="text-right text-2xl mb-2 font-arabic">{surah.bismillah.arab}</p>
      <p className="text-gray-600 mb-6">{surah.bismillah.translation}</p>

      <h2 className="text-2xl font-semibold mb-4">Ayat-ayat</h2>
      {surah.ayahs.map((ayah) => (
        <div 
          key={ayah.number.inSurah} 
          className="bg-gray-100 shadow-md rounded-lg p-4 mb-6 border border-gray-200"
        >
          <p className="text-right text-2xl mb-2 font-arabic">{ayah.arab}</p>
          <p className="text-gray-700 mb-2">{ayah.translation}</p>
          <AudioPlayer 
            audioUrl={ayah.audio.alafasy} 
            onPlay={() => handlePlay(ayah.number.inSurah)}
            isActive={activeAyah === ayah.number.inSurah}
          />
          <p className="text-sm text-gray-500 mt-2">Ayat {ayah.number.inSurah}</p>
          <p className="text-sm text-gray-500 mt-2">{ayah.tafsir.kemenag.short}</p>
        </div>
      ))}

      <Link href="/" className="mt-6 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Back to Surah List
      </Link>
    </div>
  )
}
