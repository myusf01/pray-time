<template>
  <div class="page-container settings">
    <select
      class="menu"
      v-model="selectedCountry"
      :disabled="!countries.length"
    >
      <option value="-1">Select</option>

      <option v-for="country in countries" :key="country.id" :value="country">
        {{ country.name }}
      </option>
    </select>
    <select class="menu" :disabled="!cities.length" v-model="selectedCity">
      <option value="-1">Select</option>

      <option v-for="city in cities" :key="city.id" :value="city">
        {{ city.name }}
      </option>
    </select>
    <select class="menu" :disabled="!towns.length" v-model="selectedTown">
      <option value="-1">Select</option>

      <option v-for="town in towns" :key="town.id" :value="town">
        {{ town.name }}
      </option>
    </select>
    <router-link
      class="bg-yellow-300"
      @click="fetchTimings"
      :disabled="!countries.length"
      to="/"
    >
      Save and back.
    </router-link>
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
    ...mapMutations([
      'SET_COUNTRY_ID',
      'SET_CITY_ID',
      'SET_TOWN_ID',
      'SET_USER_COUNTRY',
      'SET_USER_CITY',
      'SET_USER_TOWN'
    ])
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
      'userCountry',
      'userCity',
      'userTown'
    ]),
    selectedCountry: {
      get() {
        return this.userCountry
      },
      set(country) {
        this.SET_USER_COUNTRY(country)
        this.SET_COUNTRY_ID(country.iso2)
        this.fetchCities()
      }
    },
    selectedCity: {
      get() {
        return this.userCity
      },
      set(city) {
        this.SET_USER_CITY(city)
        this.SET_CITY_ID(city.iso2)
        this.fetchTowns()
      }
    },
    selectedTown: {
      get() {
        return this.userTown
      },
      set(town) {
        this.SET_USER_TOWN(town)
        this.SET_TOWN_ID(town.name)
        this.fetchTimings()
      }
    }
  }
}
</script>
