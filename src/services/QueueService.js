import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: false,
  headers: {
    'Accept': 'application/json',
    'Content-Type':'application/json'
  }
})

export default {
  leaveQueue(countrycode, phone) {
    var cc = countrycode.replace(/[^0-9]/g, '')
    var phn = phone.replace(/[^0-9]/g, '')
    return apiClient.delete(`/queue/${cc}/${phn}`)
  },
  getQueue() {
    return apiClient.get('/queue')
  },
  joinQueue(number, countrycode) {
    return apiClient.post('/queue', {
      phone: number.replace(/[^0-9]/g, ''),
      countrycode: countrycode.replace(/[^0-9]/g, '')
    })
  },
  sortQueue(queue, asc) {
    // asc - boolean specifying if we want the queue sorted ascending or not
    // if false, descending (longest wait first)
    var order = 1
    if(asc == true) {
      order = -1
    }
    queue.sort((a,b) => {
      if(a.enteredAt > b.enteredAt) {
        return (order * 1)
      }
      else {
        return (order * -1)
      }
    })
    return queue
  }
}
