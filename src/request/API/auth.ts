import {api} from '../index'

interface signUpData {
  role: string
  email: string
  account: string
  password: string
  confirmPassword: string
}


export default {
  signUp(data: signUpData) {
    return api.post<signUpData>('/users/register', data)
  }
}