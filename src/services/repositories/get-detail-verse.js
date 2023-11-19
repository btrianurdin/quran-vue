import clientHttp from '../networks/client-http'

const getDetailVerse = async (params) => {
  try {
    const res = await clientHttp.get(`/surat/${params?.surahId}`)

    const verse = res.data?.data?.ayat?.find((item) => item.nomorAyat === Number(params?.verseId))

    if (!verse) {
      throw new Error('Verse not found')
    }

    const result = {
      ...res.data?.data,
      ayat: verse
    }

    return result
  } catch (error) {
    throw new Error(error)
  }
}

export default getDetailVerse
