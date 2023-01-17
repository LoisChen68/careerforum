import { api } from '../index'

export default {
  getCurrentUser(token: string) {
    return api.get('/users/current_user', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}
