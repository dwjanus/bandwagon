<template>
  <div id="app">
    <app-navbar />
    <router-view />
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'

export default {
  name: 'app',
  components: {
    'app-navbar': NavBar
  }
}
</script>
