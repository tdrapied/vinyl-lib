import { createStore } from "vuex";

export default createStore({
  state: {
    isLoading: true,
  },
  mutations: {
    enableLoading(state) {
      state.isLoading = true;
    },
    disableLoading(state) {
      state.isLoading = false;
    },
  },
});
