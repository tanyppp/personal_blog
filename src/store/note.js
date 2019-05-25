import API from '../api';

export default {
  namespaced: true,
  state: {
    types: ["default", "primary", "success", "warning", "danger", "info"],
    notes: []
  },
  getters: {
    getType(state) {
      const types = state.types;
      const len = types.length;
      return function () {
        const num = Math.floor(Math.random() * len);
        return types[num];
      };
    }
  },
  mutations: {
    handleNote(state, notes) {
      state.notes = notes;
    }
  },
  actions: {
    queryAllNote({
      commit
    }) {
      API.queryAllNote().then(res => commit('handleNote', res.data));
    }
  }
}
