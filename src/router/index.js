//引入路由
import VueRouter from "vue-router";

// 获取原型对象的push函数
const originalPush = VueRouter.prototype.push;
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/index/home"
    },
    {
      path: "/index",
      name: "index",
      component: () => import("@/views/index.vue"),
      children: [
        // {
        //   path: "home",
        //   name: "home",
        //   component: () => import("@/views/home")
        // },
        // {
        //   path: "user",
        //   name: "user",
        //   component: () => import("@/views/user")
        // },
        // {
        //   path: "mall",
        //   name: "mall",
        //   component: () => import("@/views/mall")
        // },
        // {
        //   path: "pageone",
        //   name: "pageone",
        //   component: () => import("@/views/other/pageone.vue")
        // },
        // {
        //   path: "pagetwo",
        //   name: "pagetwo",
        //   component: () => import("@/views/other/pagetwo.vue")
        // }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login")
    }
  ]
});
