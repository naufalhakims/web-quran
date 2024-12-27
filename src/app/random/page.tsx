import Link from 'next/link'

async function getRandomAyah() {
  const res = await fetch('https://quran-api-id.vercel.app/random')
  if (!res.ok) {
    throw new Error('Failed to fetch random ayah')
  }
  return res.json()
}

export default async function RandomAyah() {
  const ayah = await getRandomAyah()

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6">Random Ayah</h1>
      <div className="mb-6">
        <p className="text-right text-2xl mb-2 font-arabic">{ayah.arab}</p>
        <p className="text-gray-700">{ayah.translation}</p>
        <p className="text-sm text-gray-500 mt-2">
          Surah {ayah.surah?.name || 'Unknown'} 
          {ayah.surah?.translation && `(${ayah.surah.translation})`}, 
          Ayat {ayah.number?.inSurah || 'Unknown'}
        </p>
      </div>
      <Link href="/" className="mt-6 inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Back to Surah List
      </Link>
    </div>
  )
}

