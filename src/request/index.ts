import axios, { AxiosRequestConfig } from 'axios'

const baseURL = 'http://localhost:3000/api/v1'
const awsURL = process.env.REACT_APP_AWS_URL

export const api = axios.create({
  baseURL: awsURL,
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
