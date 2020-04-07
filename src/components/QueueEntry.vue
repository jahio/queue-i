<template>
  <div>
    <form v-on:submit.prevent="enterQueue">
      <input v-model="phone" placeholder="Enter your phone number">
      <input type="submit" value="Get in Line">
    </form>
  </div>
</template>

<script>
import QueueService from '@/services/QueueService.js'

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
      QueueService.joinQueue(this.phone)
        .then(function(response) {
          console.log(response)
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
