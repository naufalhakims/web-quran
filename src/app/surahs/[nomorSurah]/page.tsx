import SurahDetail from '@/app/components/SurahDetail'

async function getSurah(nomorSurah: string) {
  const res = await fetch(`https://quran-api-id.vercel.app/surahs/${nomorSurah}`)
  if (!res.ok) {
    throw new Error('Failed to fetch surah')
  }
  return res.json()
}

export default async function SurahPage({ params }: { params: { nomorSurah: string } }) {
  const surah = await getSurah(params.nomorSurah)
  return <SurahDetail surah={surah} />
}

