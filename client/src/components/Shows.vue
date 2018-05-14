<template>
  <div class="shows">
    <h1>Shows</h1>

    <div v-if="shows.length > 0" class="table-wrap">
      <div>
        <router-link v-bind:to="{ name: 'NewShow' }" class="">Add Show</router-link>
      </div>

      <table>
        <tr>
          <td width="300">Venue</td>
          <td width="200">Date</td>
          <td width="100" align="center">Action</td>
        </tr>

        <tr v-for="show in shows" :key="show.venue">
          <td>{{ show.venue }}</td>
          <td>{{ show.date }}</td>
          <td align="center">
            <router-link v-bind:to="{ name: 'EditShow', params: { id: show._id } }">Edit</router-link>
            <a href="" @click="deleteShow(show._id)">Delete</a>
          </td>
        </tr>
      </table>
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

<style type="text/css">
.table-wrap {
  width: 60%;
  margin: 0 auto;
  text-align: center;
}
table th, table tr {
  text-align: left;
}
table thead {
  background: #f2f2f2;
}
table tr td {
  padding: 10px;
}
table tr:nth-child(odd) {
  background: #f2f2f2;
  color: #2f2f2f;
}
table tr:nth-child(even) {
  background: #2f2f2f;
  color: #fff
}
table tr:nth-child(1) {
  background: #aaa;
  color: #fff;
}
a {
  color: #4d7ef7;
  text-decoration: none;
}
a.add_show_link {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
}
</style>
