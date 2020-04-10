<template>
  <div class="queue-list">
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
      queue: []
    }
  },
  created() {
    QueueService.getQueue()
      .then(response => {
        this.queue = response.data
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
