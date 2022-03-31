<template>
  <div class="page-container settings">
    <div
      class="settings-card h-full w-[75%] rounded-t-2xl bg-gradient-to-t from-[#FFFDE4]/50 to-[#fdffed]/20 shadow-2xl shadow-[#271c44]"
    >
      <span class="text-5xl md:text-6xl font-semibold text-stone-800"
        >Settings</span
      >

      <settings-menu
        :menuLabel="selectedCountry.name"
        :menuList="countries"
        @selectedItem="
          (e) => {
            selectedCountry = e
          }
        "
      />
      <settings-menu
        :menuLabel="selectedCity.name"
        :menuList="cities"
        @selectedItem="
          (e) => {
            selectedCity = e
          }
        "
      />
      <settings-menu
        :menuLabel="selectedTown.name"
        :menuList="towns"
        @selectedItem="
          (e) => {
            selectedTown = e
          }
        "
      />

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
import SettingsMenu from '@/components/SettingsMenu.vue'
import { mapActions, mapMutations, mapState } from 'vuex'
export default {
  name: 'SettingsView',

  components: {
    SettingsMenu
  },
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
