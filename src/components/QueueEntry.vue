<template>
  <div>
    <form v-on:submit.prevent="enterQueue">
      <input v-model="phone" placeholder="Enter your phone number">
      <input type="submit" value="Get in Line">
    </form>
  </div>
</template>

<script>
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
    }
  }
}
</script>
