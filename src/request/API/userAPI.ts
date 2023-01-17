import { api } from '../index'

export default {
  getCurrentUser(token: string) {
    return api.get('/users/current_user', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
  getUser(token: string | null, id: number) {
    return api.get(`/users/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }
}
