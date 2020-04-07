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
        console.log(response)
        // TODO: redirect user back to the queue list
        // $router.push({name: 'queue-progress'})
      })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
