<template>
  <div class="shows" is="sui-container">
    <h1>Shows</h1>

    <div v-if="shows.length > 0">
      <div>
        <router-link v-bind:to="{ name: 'NewShow' }" class="">Add Show</router-link>
      </div>

      <sui-table single-line>
        <sui-table-header>
          <sui-table-row>
            <sui-table-header-cell>Date</sui-table-header-cell>
            <sui-table-header-cell>City</sui-table-header-cell>
            <sui-table-header-cell>Venue</sui-table-header-cell>
            <sui-table-header-cell>Action</sui-table-header-cell>
          </sui-table-row>
        </sui-table-header>

        <sui-table-body>
          <sui-table-row v-for="show in shows" :key="show._id">
            <sui-table-cell>{{ show.date.formatted | moment("dddd, MMMM  Do YYYY") }}</sui-table-cell>
            <sui-table-cell>{{ show.location.city || 'None' }}</sui-table-cell>
            <sui-table-cell>{{ show.location.venue.name || 'TBD' }}</sui-table-cell>
            <sui-table-cell align="center">
              <router-link v-bind:to="{ name: 'EditShow', params: { id: show._id } }">Edit</router-link>
              <a href="" @click="deleteShow(show._id)">Delete</a>
            </sui-table-cell>
          </sui-table-row>
        </sui-table-body>
      </sui-table>
    </div>

    <div v-else>
      Currently you have no shows, lets add one! <br /><br />
      <router-link v-bind:to="{ name: 'NewShow' }" class="add_show_link">Add Show</router-link>
    </div>
  </div>
</template>

<script>
import ShowsService from '@/services/ShowsServices'

export default {
  name: 'shows',
  data () {
    return {
      shows: []
    }
  },
  mounted () {
    this.getShows()
  },
  methods: {
    async getShows () {
      const response = await ShowsService.fetchShows()
      this.shows = response.data.shows
    },
    async deleteShow (id) {
      await ShowsService.deleteShow(id)
      this.$router.push({ name: 'Shows' })
    }
  }
}
</script>
