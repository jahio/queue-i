<template>
  <div>
    <p>+{{ countrycode }} {{ phone }} Waited For: {{ waitedFor.minutes }} minutes, {{ waitedFor.seconds }} seconds</p>
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

    // Figre out how long they've been waiting according to the API.
    var now   = new Date(Date.now()).getTime()
    var start = new Date(this.enteredAt * 1000).getTime()
    var dist  = now - start

    // Figure out how many minutes and seconds that is and apply
    // that to the waitedFor object. Note that in JavaScript, the
    // number we're working here (now, start and dist) is in
    // *milliseconds** since the Unix Epoch. The API will need
    // to return enteredAt in terms of *seconds*, so we divide
    // or multipley by 1000 here to convert between seconds and
    // milliseconds.

    this.waitedFor.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60))
    this.waitedFor.seconds = Math.floor((dist % (1000 * 60)) / 1000)

    // Set an interval to update the view every second (1000ms)
    this.interval = setInterval(() => {
      this.updateTimer()
    }, 1000)
  },
  methods: {
    updateTimer: function() {
      this.waitedFor.seconds += 1
      if (this.waitedFor.seconds == 60) {
        // Every 60th second, reset seconds to zero and add a minute
        this.waitedFor.minutes += 1
        this.waitedFor.seconds = 0
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
