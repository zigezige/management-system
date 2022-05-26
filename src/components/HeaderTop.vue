<template>
  <header>
    <div class="left">
      <el-button plain icon="el-icon-menu" size="small" @click="controlNav"></el-button>
      <!-- 面包屑区域 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item
          v-for="item in tags"
          :key="item.path"
          :to="{ path: '/index' + item.path }"
        >{{item.label}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 右边下拉菜单 -->
    <div class="right">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="avataImg" :src="avatar" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
// 引入仓库
import { mapState } from 'vuex'
export default {
  name: 'HeaderTop',
  data() {
    return {
      // 头像
      avatar: require('@/assets/images/avatar.png'),
      // 传递给侧边栏的数据
      isCollapse: true
    }
  },
  computed: {
    ...mapState({
      tags: state => state.tab.tabsList
    })
  },
  methods: {
    // 控制头部按钮折叠侧边栏的回调
    controlNav() {
      this.$bus.$emit('collapseType', this.isCollapse)
      this.isCollapse = !this.isCollapse
    },
    // 点击退出按钮的回调
    logout() {
      // 清空cookie和menu
      this.$store.commit('CLEARTOKEN')
      this.$store.commit('CLEARMENU')
      // 跳转至登录页面
      this.$router.push({ name: 'login' })
    }
  }
}
</script>

<style lang="less" scoped>
header {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 10px;
    }
    /deep/.el-breadcrumb__inner {
      color: #fff;
    }
    // /deep/.el-breadcrumb__inner:hover {
    //   color: #409eff;
    // }
    /deep/.el-breadcrumb__inner.is-link {
      font-weight: 400;
      // color: #409eff;
    }
  }
  .right {
    .avataImg {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
  }
}
</style>
