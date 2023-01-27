import { api } from '../index'

export default {
  getCurrentUser() {
    return api.get('/users/current_user')
  },
  getUser(id: number) {
    return api.get(`/users/${id}`)
  },
  putUser(id: number | undefined, data: object) {
    return api.put(`/users/${id}`, data)
  }
}
