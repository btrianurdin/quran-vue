import clientHttp from '../networks/client-http'

const getAllSurah = async () => {
  const res = await clientHttp.get('/surat')

  return res.data
}

export default getAllSurah
