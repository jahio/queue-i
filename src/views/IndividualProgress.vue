<template>
  <div class='individual-progress'>
    <p v-if="place - 1 > 0">There are {{ place - 1 }} people in front of you.</p>
    <p v-else>Congrats, you're up!</p>
  </div>
</template>

<script>
import QueueService from '@/services/QueueService.js'

export default {
  name: 'IndividualProgress',
  // FIXME: Blank default values here, or pull from
  // some kind of state management.
  data() {
    return {
      place: 0,
      countrycode: this.$route.params.countrycode,
      phone: this.$route.params.phone
    }
  },
  created() {
    // FIXME: If they aren't yet in the queue, force nav them to the join queue view
    // On creation, fetch and load the needed info
    this.getPlaceInLine()
  },
  methods: {
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
