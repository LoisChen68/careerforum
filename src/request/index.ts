import axios, { AxiosRequestConfig } from 'axios'

const baseURL = process.env.REACT_APP_BASE_URL

export const api = axios.create({
  baseURL,
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
