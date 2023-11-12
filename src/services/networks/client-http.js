import Axios from 'axios'

const clientHttp = Axios.create({
  baseURL: 'https://equran.id/api/v2'
})

export default clientHttp
