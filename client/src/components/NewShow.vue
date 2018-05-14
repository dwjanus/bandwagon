<template>
  <div class="shows">
    <h1>Add Show</h1>

    <div class="form">
      <div>
        <input type="text" name="venue" placeholder="VENUE" v-model="venue">
      </div>

      <div>
        <input type="text" name="date" placeholder="DATE" v-model="date">
      </div>

      <button class="new_show_btn" @click="addShow">Add</button>
    </div>
  </div>
</template>

<script>
import ShowsService from '@/services/ShowsServices'

export default {
  name: 'NewShow',
  data () {
    return {
      venue: '',
      date: ''
    }
  },
  methods: {
    async addShow () {
      await ShowsService.addShow({
        venue: this.venue,
        date: this.date
      })

      this.$router.push({ name: 'Shows' })
    }
  }
}
</script>

<style type="text/css">
.form input, .form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.new_show_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>
