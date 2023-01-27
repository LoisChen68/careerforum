import { api } from '../index'

interface signUpData {
  role: string
  email: string
  name: string
  password: string
  confirmPassword: string
}

interface loginData {
  email: string
  password: string
  token?: string
}

export default {
  signUp(data: signUpData) {
    return api.post<signUpData>('/users/register', data)
  },
  login(data: loginData) {
    return api.post<loginData>('/users/login', data)
  },
}
