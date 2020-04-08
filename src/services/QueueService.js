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
    console.log("Retrieving queue...")
    return apiClient.get('/queue')
  },
  joinQueue(number, countrycode) {
    console.log("Fired joinQueue(" + number + ")")
    return apiClient.post('/queue', { phone: number, countrycode: countrycode } )
  }
}
