import Api from '@/services/Api'

export default {
  fetchShows () {
    return Api().get('shows')
  },

  addShow (params) {
    return Api().post('shows', params)
  },

  updateShow (params) {
    return Api().put(`shows/${params.id}`, params)
  },

  getShow (params) {
    return Api().get(`shows/${params.id}`)
  },

  deleteShow (id) {
    return Api().delete(`shows/${id}`)
  }
}
