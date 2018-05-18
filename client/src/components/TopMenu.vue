<template>
  <div class="top-menu">
    <sui-menu pointing secondary color=grey>
      <router-link
        is="sui-menu-item"
        v-for="item in items"
        :active="isActive(item)"
        :key="item"
        :content="item"
        :to="item"
        @click="select(item)"
      />

      <sui-menu-menu position="right">
        <a
          is="sui-menu-item"
          :active="isActive('Logout')"
        >Logout</a>
      </sui-menu-menu>
    </sui-menu>
  </div>
</template>

<script>
export default {
  name: 'TopMenu',
  data () {
    return {
      active: 'Shows',
      items: ['Shows', 'Tours', 'Contacts']
    }
  },
  methods: {
    isActive (name) {
      return this.active === name
    },
    select (name) {
      this.active = name
    }
  }
}
</script>

