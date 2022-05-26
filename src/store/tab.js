// import router from "@/router";
import Cookie from "js-cookie";
const state = {
  // tabs列表
  tabsList: [
    {
      path: "/home",
      name: "home",
      label: "首页",
      icon: "home"
    }
  ],
  // 点击当前页的标识
  currentMenu: null,
  // 左侧菜单
  menu: []
};
const mutations = {
  SELECTMENU(state, value) {
    // 传递过来的标签是不是首页
    if (value.name !== "home") {
      // 不是首页
      state.currentMenu = value;
      const result = state.tabsList.findIndex(
        (item) => item.name === value.name
      );
      // 判断之前面包屑中 是否已经有过此标签
      if (result === -1) {
        state.tabsList.push(value);
      }
    } else {
      // 如果传递进来的是首页标签
      state.currentMenu = null;
    }
  },
  // 存放menu至cookie
  SETMENU(state, value) {
    state.menu = value;
    Cookie.set("menu", JSON.stringify(value));
  },
  // 清除cookie中的menu数据
  CLEARMENU(state) {
    state.menu = [];
    Cookie.remove("menu");
  },
  // 添加menu路由
  ADDMENU(state, router) {
    // 判断cookie是否存在menu
    if (!Cookie.get("menu")) {
      return;
    }
    const menu = JSON.parse(Cookie.get("menu"));
    state.menu = menu;
    const menuArray = [];
    menu.forEach((item) => {
      if (item.children) {
        item.children = item.children.map((item) => {
          item.component = () => import(`@/views/${item.url}`);
          return item;
        });
        menuArray.push(...item.children);
      } else {
        item.component = () => import(`@/views/${item.url}`);
        menuArray.push(item);
      }
    });
    // 动态添加路由
    menuArray.forEach((item) => {
      router.addRoute("index", item);
    });
  }
};
const actions = {};
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters
};
