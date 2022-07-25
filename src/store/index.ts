import createPersistedState from 'vuex-persistedstate'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    participantId: '',
    user: null
  },
  getters: {
    getParticipantId: state => state.participantId,
    getUser: state =>  state.user
  },
  mutations: {
    setParticipantId: (state, value) => state.participantId = value,
    setUser: (state, value) => state.user = value
  },
  modules: {
  }
})
