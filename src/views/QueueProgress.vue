<template>
  <div class="queue-list">
    <span v-if="this.asc">Newest First</span>
    <span v-else>Oldest First</span>
    <button v-on:click="toggleSort">Flip</button>
    <QueueCard v-for="person in queue" :key="person.countrycode + person.phone" :phone="person.phone" :countrycode="person.countrycode" :enteredAt="person.enteredAt" />
  </div>
</template>

<script>
// @ is an alias to /src
import QueueCard from '@/components/QueueCard.vue'
import QueueService from '@/services/QueueService.js'

export default {
  name: 'QueueProgress',
  components: {
    QueueCard
  },
  data() {
    return {
      queue: [],
      asc: false
    }
  },
  watch: {
    asc: function() {
      this.sortQueue()
    }
  },
  methods: {
    toggleSort() {
      if (this.asc == false) {
        this.asc = true
      }
      else {
        this.asc = false
      }
    },
    sortQueue() {
      this.queue = QueueService.sortQueue(this.queue, this.asc)
    }
  },
  created() {
    QueueService.getQueue()
      .then(response => {
        // Clean up the queue information we get from the API, because
        // we want ONLY digits in our data, no punctuation, especially
        // since format can differ by country. Not using \D because
        // we'll end up with - characters in the data that way.
        this.queue = response.data
        for(var i = 0; i < this.queue.length; i++) {
          this.queue[i].countrycode = this.queue[i].countrycode.replace(/[^0-9]/g, '')
          this.queue[i].phone = this.queue[i].phone.replace(/[^0-9]/g, '')
        }
        this.sortQueue(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
  .queue-list {
    text-align: center;
  }
</style>
