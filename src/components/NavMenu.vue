<template>
  <!--     @open="handleOpen"
  @close="handleClose"-->
  <el-menu
    default-active="1-4-1"
    class="el-menu-vertical-demo"
    :collapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    collapse-transition="false"
  >
    <h3 @click="goIndex">{{isCollapse==false ? '通用后台管理系统' : '后台'}}</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.index"
      @click="navigate(item)"
    >
      <i :class="'el-icon-'+item.icon"></i>
      <span slot="title">{{item.label}}</span>
    </el-menu-item>
    <el-submenu index="2" v-for="item1 in children" :key="item1.index">
      <template slot="title">
        <i :class="'el-icon-'+item1.icon"></i>
        <span slot="title">{{item1.label}}</span>
      </template>
      <el-menu-item-group v-for="item in item1.children" :key="item.index">
        <el-menu-item @click="navigate(item)" :index="item.path">{{item.label}}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      menu: [
        {
          path: '/home',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/pageone',
              name: 'pageone',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/pagetwo',
              name: 'pagetwo',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
    };
  },
  computed: {
    noChildren() {
      return this.asyncMenu.filter(item => !item.children)
    },
    children() {
      return this.asyncMenu.filter(item => item.children)
    },
    asyncMenu() {
      return this.$store.state.tab.menu
    }
  },
  mounted() {
    // 兄弟组件通信
    this.$bus.$on('collapseType', (data) => {
      this.isCollapse = data
    })
  },
  methods: {
    //点击侧边导航栏顶部 回到主页
    goIndex() {
      this.$router.push('/index/home')
    },
    navigate(item) {
      // 路由跳转
      this.$router.push({
        name: item.name
      }),
        this.$store.commit('SELECTMENU', item)
    }
  }
}
</script>

<style scoped lang="less">
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
