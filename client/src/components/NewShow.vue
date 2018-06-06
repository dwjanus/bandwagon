<template>
  <div class="shows" is="sui-container">
    <h1 class="ui dividing header">Add Show</h1>

    <sui-form>
      <sui-form-field>
        <div class="fields">
          <sui-form-field class="four wide">
            <date-picker
              ref="datepicker"
              :value="state.date" name="date"
              v-model="date"
              placeholder="Date"
              id="date-picker">
            </date-picker>
          </sui-form-field>

          <sui-form-field class="four wide">
            <!-- <label>City</label> -->
            <input type="text" name="city" placeholder="City" v-model="city">
          </sui-form-field>

          <sui-form-field class="four wide">
            <!-- <label>State</label> -->
            <states-dropdown ref="statesdd"/>
          </sui-form-field>

          <sui-form-field class="four wide">
            <!-- <label>Venue</label> -->
            <input type="text" name="venue_name" placeholder="Venue" v-model="venue_name">
          </sui-form-field>
        </div>
      </sui-form-field>

      <!-- make this if venue_name has value -->
      <sui-form-field>
        <label>Address</label>
        <input type="text" name="venue_address" v-model="address">
      </sui-form-field>

      <sui-form-field>
        <label>Bands</label>
        <input type="text" name="bands" v-model="bands">
      </sui-form-field>

      <sui-form-field>
        <label>Description</label>
        <input type="text" name="description" v-model="description">
      </sui-form-field>

      <sui-form-field>
        <label>Link</label>
        <input type="text" name="link" v-model="link">
      </sui-form-field>

      <sui-button basic primary class="new_show_btn" @click.prevent="addShow">Add</sui-button>
    </sui-form>
  </div>
</template>


<script>
import Datepicker from 'vuejs-datepicker'
import $ from 'jquery'
import ShowsService from '@/services/ShowsServices'
import StatesDropdown from './StatesDropdown'

export default {
  name: 'NewShow',
  components: {
    'states-dropdown': StatesDropdown,
    'date-picker': Datepicker
  },
  data () {
    return {
      date: '',
      formatted: '',
      city: '',
      state: '',
      venue_name: '',
      address: '',
      bands: '',
      description: '',
      link: ''
    }
  },
  methods: {
    async addShow () {
      const iso = new Date(this.date.toString()).toISOString().split('T')[0]
      const isoSplit = iso.split('-')
      const formatted = new Date(`${isoSplit[1]}-${isoSplit[2]}-${isoSplit[0]}`)

      await ShowsService.addShow({
        date: this.date,
        formatted,
        city: this.city,
        state: this.$refs.statesdd.current,
        venue_name: this.venue_name,
        address: this.venue_address,
        bands: this.bands,
        description: this.description,
        link: this.link
      })

      this.$router.push({ name: 'Shows' })
    }
  },
  mounted () {
    const calendarIcon = '<i class="calendar icon"></i>'
    $('#date-picker').css('cursor', 'pointer')
    $('#date-picker').parent().addClass('ui input icon four wide').append(calendarIcon)
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
