import axios, { AxiosRequestConfig } from 'axios'

const baseURL = 'http://localhost:3000/api'
const AWSbaseURL =
  'https://0lrxs3wck8.execute-api.ap-northeast-1.amazonaws.com/api'

export const api = axios.create({
  baseURL: baseURL,
})

// 發 req 前預先會做的事情
api.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error(error)
  }
)
