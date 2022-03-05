import { createStore } from "vuex"
import { VuexPersistence } from "vuex-persist"

import getters from "./getters"
import actions from "./actions"
import mutations from "./mutations"

const vuexLocalPersistence = new VuexPersistence({
  storage: window.localStorage,
})
export default createStore({
  plugins: [vuexLocalPersistence.plugin],
  state: {},
  getters,
  mutations,
  actions,
})
