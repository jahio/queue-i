import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://qi.db.localdev',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type':'application/json'
  }
})

export default {
  getQueue() {
    return apiClient.get('/queue')
  },
  joinQueue(number, countrycode) {
    return apiClient.post('/queue', { phone: number, countrycode: countrycode } )
  }
}
