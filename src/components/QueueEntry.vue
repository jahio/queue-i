<template>
  <div>
    <form @submit.prevent="enterQueue">
      <input type="text" v-model="phone" placeholder="Enter your phone number">
      <button>Get in Line</button>
    </form>
  </div>
</template>

<script>
// import QueueService from '@/services/QueueService.js'
import axios from 'axios'
/* eslint-disable */
export default {
  name: 'QueueEntry',
  data() {
    return {
      phone: ''
    }
  },
  methods: {
    enterQueue: function() {
      console.log("Enter queue for phone number: " + this.phone)
      axios({
        method: 'post',
        url: 'http://qi.db.localdev/queue',
        data: {
          phone: this.phone
        }
      }).then(function(response) {
        console.log(response.data)
        debugger
        this.phone = response.data
        // $router.push({name: 'queue-progress'})
      })
      // QueueService.joinQueue(this.phone)
      //   .then(function(response) {
      //     window.addEventListener('beforeunload', () => {
      //       console.log("Adding event listener")
      //     })
          // Success - server is happy, now get the current queue status
        //   console.log(response)
        // })
      //   .catch(function(error) {
      //     console.log(error)
      //   })
    }
  }
}
</script>
