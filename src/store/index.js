import Vue from 'vue';
import Vuex from 'vuex';

// 各命名空间的store
import home from './home';
import note from './note';
import about from './about';
import board from './board';
import blogDetail from './blogDetail';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: 'tanyp'
  },
  getters: {
    getName(state) {
      return state.name;
    }
  },
  modules: {
    tanyp: {
      namespaced: true,
      modules: {
        home,
        note,
        about,
        board,
        blogDetail
      }
    }
  }
})
