<template>
  <div id="nav">
    <nav>
      <router-link :to="{ name: 'queue-progress' }">Queue Progress</router-link> |
      <router-link :to="{ name: 'enter-queue' }">Enter Queue</router-link> |
      <router-link :to="{ name: 'individual-progress' }">My Place In Line</router-link>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
</style>
