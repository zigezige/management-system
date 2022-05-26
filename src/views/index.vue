<template>
  <!-- 侧边栏 -->
  <el-container style="height:100%">
    <el-aside width="auto">
      <NavMenu></NavMenu>
    </el-aside>
    <el-container>
      <!-- 头部 -->
      <el-header>
        <HeaderTop></HeaderTop>
      </el-header>
      <!-- 主题内容 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 引入头部
import HeaderTop from '@/components/HeaderTop'
// 引入侧边栏
import NavMenu from '@/components/NavMenu'
export default {
  components: {
    NavMenu,
    HeaderTop
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Index'
}
</script>

<style scoped>
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 0;
}
</style>
