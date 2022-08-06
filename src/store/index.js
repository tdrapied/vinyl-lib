import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    isLoading: true,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    enableLoading(state) {
      state.isLoading = true;
    },
    disableLoading(state) {
      state.isLoading = false;
    },
  },
});
