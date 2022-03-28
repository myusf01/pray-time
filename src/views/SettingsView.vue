<template>
  <div class="page-container settings">
    <div
      class="settings-card h-full rounded-t-2xl bg-gradient-to-t from-[#FFFDE4]/50 to-[#fdffed]/20 shadow-2xl shadow-[#271c44]"
    >
      <span class="text-5xl md:text-6xl font-semibold text-stone-800"
        >Settings</span
      >
      <select
        class="settings-item settings-text upper shadow-lg shadow-gray-300/50"
        v-model="selectedCountry"
        :disabled="!countries.length"
      >
        <option v-for="country in countries" :key="country.id" :value="country">
          {{ country.name }}
        </option>
      </select>
      <select
        class="settings-item settings-text shadow-lg shadow-gray-300/50"
        :disabled="!cities.length"
        v-model="selectedCity"
      >
        <option v-for="city in cities" :key="city.id" :value="city">
          {{ city.name }}
        </option>
      </select>
      <select
        class="settings-item settings-text shadow-lg shadow-gray-300/50"
        :disabled="!towns.length"
        v-model="selectedTown"
      >
        <option v-for="town in towns" :key="town.id" :value="town">
          {{ town.name }}
        </option>
      </select>
      <router-link
        class="settings-item settings-text bg-blue-500 text-slate-100 shadow-lg shadow-blue-500/50"
        @click="fetchTimings"
        :disabled="!towns.length"
        to="/"
      >
        Save
      </router-link>
    </div>
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
        this.SET_COUNTRY_ID(country.id)
        this.fetchCities()
      }
    },
    selectedCity: {
      get() {
        return this.userCity
      },
      set(city) {
        this.SET_USER_CITY(city)
        this.SET_CITY_ID(city.id)
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
