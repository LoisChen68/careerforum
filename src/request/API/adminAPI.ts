import { api } from '../index'

export default {
  getUsers(token: string) {
    api.get('/admin/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
  },
}
