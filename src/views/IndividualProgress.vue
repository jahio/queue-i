<template>
  <div class='individual-progress'>
    <p v-if="place - 1 > 0">There are {{ place - 1 }} people in front of you.</p>
    <p v-else>Congrats, you're up!</p>
    <button v-on:click="leaveQueue">Leave Queue</button>
  </div>
</template>

<script>
import QueueService from '@/services/QueueService.js'

export default {
  name: 'IndividualProgress',
  data() {
    return {
      place: 0,
      countrycode: this.$route.params.countrycode,
      phone: this.$route.params.phone
    }
  },
  created() {
    // TODO: Verify that they're actually in the queue and then
    // if not, redirect them to the join queue view
    this.getPlaceInLine()

    // Try to work with WebSockets to tell when it's
    // your turn
    var ws = new WebSocket('ws://localhost:8999')
    var t = this
    ws.onopen = function(evt) {
      console.log('Connection Open...')
      console.log(evt)
    }
    ws.onmessage = function(evt) {
      console.log('Received: %s', evt.data)
      t.getPlaceInLine()
    }
    ws.onclose = function(evt) {
      console.log('Connection Closed')
      console.log(evt)
    }
  },
  methods: {
    leaveQueue: function() {
      var router = this.$router
      QueueService.leaveQueue(this.countrycode, this.phone)
      .then(function() {
        router.push({name: 'queue-progress'})
      })
    },
    getPlaceInLine: function() {
      QueueService.getQueue()
      .then(response => {
        var queue = QueueService.sortQueue(response.data, false)
        var countrycode = this.countrycode
        var phone = this.phone

        var index = queue.findIndex(function(q) {
          if (q.countrycode == countrycode && q.phone == phone) {
            return true
          }
        })

        console.log(index)

        this.place = index + 1
      })
      .catch(err => {
        console.log("Error: " + err)
      })
    }
  }
}
</script>

<style scoped>
</style>
