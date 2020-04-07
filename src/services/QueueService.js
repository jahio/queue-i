import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://qi.db.localhost',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type':'application/json'
  }
})

export default {
  getQueue() {
    return apiClient.get('/queue')
  }
}
