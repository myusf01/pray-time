<template>
  <div class="settings">
    <select v-model="selectedCountry">
      <option value="-1">Select</option>

      <option
        v-for="country in countries"
        :key="country.id"
        :value="country.iso2"
      >
        {{ country.name }}
      </option>
    </select>
    <select v-model="selectedCity">
      <option value="-1">Select</option>

      <option v-for="city in cities" :key="city.id" :value="city.iso2">
        {{ city.name }}
      </option>
    </select>
    <select v-model="selectedTown">
      <option value="-1">Select</option>

      <option v-for="town in towns" :key="town.id" :value="town.name">
        {{ town.name }}
      </option>
    </select>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'SettingsView',
  methods: {
    ...mapActions([
      'fetchCountries',
      'fetchCities',
      'fetchTowns',
      'fetchTimings'
    ]),
    ...mapMutations(['SET_COUNTRY_ID', 'SET_CITY_ID', 'SET_TOWN_ID'])
  },
  created() {
    if (!this.countries.length) {
      this.fetchCountries()
    }
  },
  computed: {
    ...mapState([
      'countries',
      'cities',
      'towns',
      'countryIsoId',
      'cityIsoId',
      'townIsoId'
    ]),
    selectedCountry: {
      get() {
        return this.countryIsoId
      },
      set(isoId) {
        this.SET_COUNTRY_ID(isoId)
        this.fetchCities()
      }
    },
    selectedCity: {
      get() {
        return this.cityIsoId
      },
      set(isoId) {
        this.SET_CITY_ID(isoId)
        this.fetchTowns()
      }
    },
    selectedTown: {
      get() {
        return this.townIsoId
      },
      set(townName) {
        this.SET_TOWN_ID(townName)
        console.log(this.towns)
        this.fetchTimings()
      }
    }
  }
}
</script>
