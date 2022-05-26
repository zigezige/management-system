import Cookie from "js-cookie";

export default {
  state: {
    token: ""
  },
  mutations: {
    SETTOKEN(state, value) {
      state.token = value;
      Cookie.set("token", value);
    },
    CLEARTOKEN(state) {
      state.token = "";
      Cookie.remove("token");
    },
    GETTOKEN(state) {
      state.token = state.token || Cookie.get("token");
    }
  }
};
