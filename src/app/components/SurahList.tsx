import Link from 'next/link'

async function getSurahs() {
  const res = await fetch('https://quran-api-id.vercel.app/surahs')
  if (!res.ok) {
    throw new Error('Failed to fetch surahs')
  }
  return res.json()
}

export default async function SurahList() {
  const surahs = await getSurahs()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {surahs.map((surah: any) => (
        <div key={surah.number} className="bg-white shadow rounded-lg p-4">
          <h2 className="text-xl font-semibold">{surah.name}</h2>
          <p className="text-gray-600">{surah.translation}</p>
          <p className="text-sm text-gray-500 mt-2">Ayat: {surah.numberOfAyahs}</p>
          <Link href={`/surahs/${surah.number}`} className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            View Details
          </Link>
        </div>
      ))}
    </div>
  )
}

