import Link from 'next/link'

async function searchSurahs(query: string) {
  const res = await fetch('https://quran-api-id.vercel.app/surahs')
  if (!res.ok) {
    throw new Error('Failed to fetch surahs')
  }
  const surahs = await res.json()
  return surahs.filter((surah: any) => 
    surah.name.toLowerCase().includes(query.toLowerCase()) ||
    surah.translation.toLowerCase().includes(query.toLowerCase())
  )
}

export default async function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q
  const results = await searchSurahs(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((surah: any) => (
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
      ) : (
        <p className="text-xl">No results found for "{query}"</p>
      )}
      <Link href="/" className="mt-8 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Back to Surah List
      </Link>
    </div>
  )
}

