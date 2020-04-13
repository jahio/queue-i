<template>
  <div class="queue-item">
    <router-link :to="{ name: 'individual-progress', params: { countrycode: countrycode, phone: phone } }">
    <p>
      +{{ countrycode }} {{ phone }}<br/>
      <span class="small">
        Waited For: {{ waitedFor.minutes }} minutes, {{ waitedFor.seconds }} seconds
      </span>
    </p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'QueueCard',
  data: function() {
    return {
      waitedFor: { minutes: 0, seconds: 0 }
    }
  },
  props: {
    countrycode: String,
    phone: String,
    enteredAt: Number
  },
  mounted: function() {
    // Start the updateTimer function immediately so there's not an unsightly
    // second where all metrics read "zero"
    this.updateTimer()

    // Set an interval to update the view every second (1000ms)
    this.interval = setInterval(() => {
      this.updateTimer()
    }, 1000)
  },
  methods: {
    updateTimer: function() {
      // Figre out how long they've been waiting according to the API.
      var now   = new Date(Date.now()).getTime()
      var start = new Date(this.enteredAt * 1000).getTime()
      var dist  = now - start

      // Figure out how many minutes and seconds that is and apply
      // that to the waitedFor object. Note that in JavaScript, the
      // number we're working here (now, start and dist) is in
      // *milliseconds** since the Unix Epoch. The API will need
      // to return enteredAt in terms of *seconds*, so we divide
      // or multiply by 1000 here to convert between seconds and
      // milliseconds.

      this.waitedFor.minutes = Math.floor(dist / (60 * 1000))
      this.waitedFor.seconds = Math.floor((dist / 1000) - (this.waitedFor.minutes * 60))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.queue-item {
  padding: 20px;
  margin-bottom: 24px;
  transition: all 0.2s linear;
  cursor: pointer;
}
.queue-item:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.small {
  color: #666;
  font-size: 70%;
}
a {
  text-decoration: none;
  color: #000;
}
</style>
