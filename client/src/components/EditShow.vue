<template>
  <div class="shows" is="sui-container">
    <h1 class="ui dividing header">Edit</h1>

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

          <sui-form-field class="four wide field">
            <!-- <label>City</label> -->
            <input type="text" name="city" placeholder="City" v-model="city">
          </sui-form-field>

          <sui-form-field>
            <!-- <label>State</label> -->
            <states-dropdown ref="statesdd"/>
          </sui-form-field>

          <sui-form-field class="four wide field">
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

      <sui-button basic primary class="app_show_btn" @click.prevent="updateShow">Update</sui-button>
    </sui-form>
  </div>
</template>


<script>
import Datepicker from 'vuejs-datepicker'
import $ from 'jquery'
import ShowsService from '@/services/ShowsServices'
import StatesDropdown from './StatesDropdown'

export default {
  name: 'EditShow',
  components: {
    'states-dropdown': StatesDropdown,
    'date-picker': Datepicker
  },
  data () {
    return {
      id: this.$route.params.id,
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
  mounted () {
    const calendarIcon = '<i class="calendar icon"></i>'
    $('#date-picker').css('cursor', 'pointer')
    $('#date-picker').parent().addClass('ui input icon four wide').append(calendarIcon)
    this.getShow()
  },
  methods: {
    async getShow () {
      const response = await ShowsService.getShow({
        id: this.$route.params.id
      })

      const data = response.data

      this.date = data.date.utc
      this.formatted = data.date.formatted
      this.city = data.location.city
      this.state = data.location.state
      this.venue_name = data.location.venue.name
      this.address = data.location.venue.address
      this.bands = data.bands
      this.description = data.description
      this.link = data.link
    },
    async updateShow () {
      const iso = new Date(this.date.toString()).toISOString().split('T')[0]
      const isoSplit = iso.split('-')
      const formatted = new Date(`${isoSplit[1]}-${isoSplit[2]}-${isoSplit[0]}`)

      await ShowsService.updateShow({
        id: this.$route.params.id,
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
  }
}
</script>
