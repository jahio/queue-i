<template>
  <div class='individual-progress'>
    My Place In Line {{ place }}
    <p>There are {{ place - 1 }} people in front of you.</p>
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
      countrycode: '1',
      phone: '5126981039'
    }
  },
  created() {
    // FIXME: Order the queue by time waited descending before checking position
    // On creation, fetch and load the needed info
    this.getPlaceInLine()
  },
  methods: {
    getPlaceInLine: function() {
      QueueService.getQueue()
      .then(response => {
        var queue = response.data
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
.individual-progress {
  color: #ccc;
}
</style>
