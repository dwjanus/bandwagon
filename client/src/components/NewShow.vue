<template>
  <div class="new_show" is="sui-container">
    <h1 class="ui dividing header">Add Show</h1>

    <sui-form>
      <sui-form-field>
        <label>Date</label>
        <input type="date" name="date" v-model="date">
      </sui-form-field>

      <div class="two fields">
        <sui-form-field>
          <label>City</label>
          <input type="text" name="city" placeholder="City" v-model="city">
        </sui-form-field>

        <div class="field">
          <label>State</label>
          <StatesDropdown />
        </div>
      </div>

      <sui-form-field>
        <input type="string" name="venue_name" v-model="venue_name">
      </sui-form-field>

      <sui-form-field>
        <input type="string" name="address" v-model="address">
      </sui-form-field>

      <sui-form-field>
        <input type="string" name="address" v-model="address">
      </sui-form-field>

      <sui-form-field>
        <input type="string" name="address" v-model="address">
      </sui-form-field>

      <sui-form-field>
        <input type="string" name="bands" v-model="bands">
      </sui-form-field>

      <sui-button basic primary class="new_show_btn" @click="addShow">Add</sui-button>
    </sui-form>
  </div>
</template>

<script>
import ShowsService from '@/services/ShowsServices'
import StatesDropdown from './StatesDropdown'

export default {
  name: 'NewShow',
  components: {
    StatesDropdown
  },
  data () {
    return {
      date: '',
      location: {
        city: '',
        state: ''
      },
      venue: {
        name: '',
        address: ''
      },
      bands: '',
      description: '',
      link: ''
    }
  },
  methods: {
    async addShow () {
      await ShowsService.addShow({
        date: this.date,
        location: {
          city: this.city,
          state: this.state
        },
        venue: {
          name: this.venue_name,
          address: this.address
        },
        bands: this.bands,
        description: this.description,
        link: this.link
      })

      this.$router.push({ name: 'Shows' })
    }
  }
}
</script>

<!-- <style type="text/css">
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
</style> -->
