<template>
  <div class="login">
    <el-form class="login_form">
      <h1>{{ msg }}</h1>
      <el-row>
        <el-col>
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user-solid" placeholder="用户名">
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-input v-model="loginForm.password" prefix-icon="el-icon-key" placeholder="密码">
          </el-input>
        </el-col>
      </el-row>
      <el-button style="width:100%;" @click="handleLogin" type="primary">登陆</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      loginForm: {
        username: undefined,
        password: undefined
      },
      msg: '子金XX管理系统'
    }
  },  
  methods: {
    handleLogin () {
      this.$router.push({path: '/page/Layout'})
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login_form {
  border: #ccc 1px solid;
  width: 26%;
  padding: 1%;
  margin-left: 36%;
}
.el-row {
  margin-bottom: 20px;
}
.el-col {
  border-radius: 4px;
}

</style>
