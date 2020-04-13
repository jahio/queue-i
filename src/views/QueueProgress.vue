<template>
  <div class="queue-list">
    Currently sorted {{ sortOrder }} |
    <button v-on:click="toggleSort">Sort {{ oppositeSortOrder }}</button>
    <QueueCard v-for="person in queue" :key="person.phone" :phone="person.phone" :countrycode="person.countrycode" :enteredAt="person.enteredAt" />
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
  computed: {
    sortOrder: function() {
      if (this.asc == true) {
        return 'Ascending'
      }
      return 'Descending'
    },
    oppositeSortOrder: function() {
      if (this.asc == true) {
        return 'Descending'
      }
      return 'Ascending'
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
        this.queue = response.data
        this.sortQueue(false)
      })
      .catch(err => {
        console.log(err.response)
      })
  }
}
</script>

<style scoped>
  .queue-list {
    text-align: center;
  }
</style>
