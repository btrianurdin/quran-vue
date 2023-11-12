import clientHttp from '../networks/client-http'

const getDetailsSurah = async ({ id }) => {
  const res = await clientHttp.get(`/surat/${id}`)

  return res.data
}

export default getDetailsSurah
