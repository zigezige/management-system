import Vue from "vue";
import App from "./App.vue";

//引入axios
import http from "axios";
Vue.prototype.$http = http;
// 引入mock
import "@/api/mock.js";

//引入全局less样式
import "@/assets/less/index.less";

//引入elementUI
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

//引入路由
// 引入路由
import VueRouter from "vue-router";
import router from "./router";
Vue.use(VueRouter);

// 配置vuex
import store from "@/store/index";

// 路由守卫
router.beforeEach((to, from, next) => {
  store.commit("GETTOKEN");
  const token = store.state.user.token;
  if (!token && to.name !== "login") {
    // 未登录且要去其他页面 跳转到登录界面
    next({ name: "login" });
  } else if (token && to.name === "login") {
    //登录后不允许再访问login
    next({ name: "home" });
  } else {
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
  // 页面加载之前 动态渲染一遍路由
  mounted() {
    store.commit("ADDMENU", router);
  },
  // 定义全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this;
  }
}).$mount("#app");
