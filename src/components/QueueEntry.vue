<template>
  <div>
    <form @submit.prevent="enterQueue">
      <input type="text" v-model="countrycode" placeholder="Country Code">
      <input type="text" v-model="phone" placeholder="Enter your phone number">
      <button>Get in Line</button>
    </form>
  </div>
</template>

<script>
import QueueService from '@/services/QueueService.js'

/* eslint-disable */
export default {
  name: 'QueueEntry',
  data() {
    return {
      phone: '',
      countrycode: ''
    }
  },
  methods: {
    enterQueue: function() {
      var router = this.$router // so we can access this.$router later
      QueueService.joinQueue(this.phone, this.countrycode)
        .then(function(response) {
          router.push({name: 'queue-progress'})
        })
        .catch(function(error) {
          console.log(error)
        })
    }
  }
}
</script>
