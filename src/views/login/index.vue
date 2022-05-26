<template>
  <el-form
    class="login-container"
    ref="form"
    :model="form"
    status-icon
    :rules="rules"
    label-width="80px"
  >
    <h3 class="login-title">系统登录</h3>
    <el-form-item label="用户名" label-width="80px" prop="username" class="username">
      <el-input v-model="form.username" type="input" auto-complete="off" placeholder="请输入账号"></el-input>
    </el-form-item>
    <el-form-item label="密码" label-width="80px" prop="password">
      <el-input v-model="form.password" type="password" auto-complete="off" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="login" class="login-submit">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 引入mock
// import Mock from 'mockjs'
// 引入mock请求
import { getMenu } from '@/api/index'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'login',
  data() {
    return {
      // 表单收集的数据
      form: {},
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: 'blur' },
          {
            min: 3,
            message: "用户名长度不能小于三位",
            trigger: "blur"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    // 点击登录按钮的回调
    async login() {
      let result = await getMenu(this.form)
      if (result.data.code === 20000) {
        this.$store.commit('CLEARMENU')
        this.$store.commit('SETMENU', result.data.data.menu)
        this.$store.commit('SETTOKEN', result.data.data.token)
        this.$store.commit('ADDMENU', this.$router)
        this.$router.push({ name: 'home' })
      }
      // 初始化存放token
      // const token = Mock.random.guid
      // this.$store.commit("SETTOKEN", token)
      // this.$router.push({ name: 'home' })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-title {
  margin: 0px auto 40px;
  text-align: center;
  color: #505458;
}
.login-submit {
  margin: 10px auto 0px;
}
</style>
