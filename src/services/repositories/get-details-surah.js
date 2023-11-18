import clientHttp from '../networks/client-http'

const getDetailsSurah = async ({ id }) => {
  if (!id) throw new Error('id is required')

  const res = await clientHttp.get(`/surat/${id}`)

  return res.data
}

export default getDetailsSurah
