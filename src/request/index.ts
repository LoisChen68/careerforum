import axios from 'axios'

const baseURL = 'http://localhost:3000/api'
const token = localStorage.getItem('token')

export const api = axios.create({
  baseURL: baseURL,
  headers: { Authorization: `Bearer ${token}` }
})
