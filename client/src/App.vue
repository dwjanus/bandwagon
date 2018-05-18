<template>
  <div id="app">
    <topmenu />
    <router-view/>
  </div>
</template>

<script>
import topmenu from '@/components/TopMenu'

export default {
  name: 'App',
  components: {
    topmenu
  }
}
</script>

