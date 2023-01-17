import axios from 'axios'

const baseURL = 'http://localhost:3000/api'
const AWSbaseURL =
  'https://0lrxs3wck8.execute-api.ap-northeast-1.amazonaws.com/api'

export const api = axios.create({
  baseURL: AWSbaseURL,
})
