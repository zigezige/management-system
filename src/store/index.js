import Vue from "vue";
import Vuex from "vuex";
import tab from "./tab.js";
import user from "./user.js";

Vue.use(Vuex);

//对外暴露Store类的一个实例
export default new Vuex.Store({
  //把小仓库进行合并变成大仓库
  modules: {
    tab,
    user
  }
});
