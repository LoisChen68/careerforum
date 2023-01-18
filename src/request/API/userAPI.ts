import { api } from '../index'

export default {
  getCurrentUser() {
    return api.get('/users/current_user')
  },
  getUser(id: number) {
    return api.get(`/users/${id}`)
  }
}
