<template>
  <!-- 整体背景 -->
  <div class="login-wrap">
    <!--输入框-->
    <div class="form-wrapper">
      
      <div class="header">
        丰顺快递
      </div>

      <div class="input-wrapper">
        <div class="border-wrapper">
          <input type="text" v-model="user.tel" name="tel" placeholder="tel" class="border-item" autocomplete="off" />
        </div>
        <div class="border-wrapper">
          <input  type="password" v-model="user.password" name="password" placeholder="password" class="border-item" autocomplete="off" />
        </div>
      </div>

      <div >
        <el-radio-group v-model="option">
        <el-radio :label="0">用户</el-radio>
        <el-radio :label="1">快递员</el-radio>
        <el-radio :label="2">网点管理员</el-radio>
        </el-radio-group>
      </div>

      <div class="action">
        <el-button class="btn" style="width:40%;" @click="handleLogin" type="text">LOGIN</el-button>
        <el-button class="btn" style="width:40%;" @click="goRegister" type="text">REGISTER</el-button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import Vue from 'vue'
import VueCookies from 'vue-cookies'


Vue.use(VueCookies)

export default {
  name: 'login',
  data () {
    return {
  user: {
          tel:"",
          password: ""
        },
  option:0
    }
  },  
  methods: {
    goRegister () {
      this.$router.push({path: '/registered'})
    },
    handleLogin() {
      console.log( this.url )
      let url=0
      if(this.option==0)
      url=this.url+"/client/login";
      else if(this.option==1)
      url=this.url+"/courier/login";
      else if(this.option==2)
      url=this.url+"/manager/login"

      console.log(url)
        if (!this.user.tel) {
          this.$message.error("请输入用户名！");
          return;
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } 
           else {
            // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
            axios
              .post(url,
                qs.stringify({
                tel: this.user.tel,
                password: this.user.password,
                loginType:this.option
                }
              ))
              .then(res => {
                console.log("输出response.data", res.data);
                console.log(typeof(res.data))
                this.$message({
                       type: 'success',
                       message: res.data
                     });
                if (res.data.includes("登录成功")) {
                  if(this.option==0)
                  this.$router.push({ path: "/user_1" });
                  else if(this.option==1)
                  {
                  this.$router.push({ path: "/Couriers_1" });
                  }
                  else if(this.option==2)
                  {
                  this.$router.push({ path: "/manage" });
                  }
                } 
              });
          }
    }
  }
}

</script>

<style scoped>
.login-wrap {
  height: 100%;
  font-family: JetBrains Mono Medium;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background-color: #0e92b3; */
  background: linear-gradient(145deg, #44b8c7, #44b8c7 50%, #dbcf5f, #dbcf5f 50%);
  background-size: 100% 100%;
}

.form-wrapper {
  width: 300px;
  background-color: rgba(255, 255, 255, 0.8);
  color: rgb(0, 0, 0);
  border-radius: 2px;
  padding: 50px;
}

.form-wrapper .header {
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 100px;
}

.form-wrapper .input-wrapper input {
  background-color: rgb(255, 255, 255);
  border: 0;
  width: 100%;
  text-align: center;
  font-size: 15px;
  color: rgb(0, 0, 0);
  outline: none;
}

.form-wrapper .input-wrapper input::placeholder {
  text-transform: uppercase;
}

.form-wrapper .input-wrapper .border-wrapper {
  background-image: linear-gradient(to right, #e8198b, #0eb4dd);
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-wrapper .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px);
  width: calc(100% - 4px);
  border-radius: 30px;
}

.form-wrapper .action {
  display: flex;
  justify-content: center;
}

.form-wrapper .action .btn {
  width: 60%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 30px;
  border-radius: 30px;
  cursor: pointer;
  margin-top: 15px;
}

.form-wrapper .action .btn:hover {
  background-image: linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%);
}

.form-wrapper .icon-wrapper {
  text-align: center;
  width: 60%;
  margin: 0 auto;
  margin-top: 20px;
  border-top: 1px dashed rgb(146, 146, 146);
  padding: 20px;
}

.form-wrapper .icon-wrapper i {
  font-size: 20px;
  color: rgb(187, 187, 187);
  cursor: pointer;
  border: 1px solid #fff;
  padding: 5px;
  border-radius: 20px;
}

.form-wrapper .icon-wrapper i:hover {
  background-color: #0e92b3;
}
</style>