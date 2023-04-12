<template>
    <div class="login clearfix">
      <div class="login-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" status-icon label-width="80px">
            <h3>注册</h3>
            <hr>
            <el-form-item prop="tel" label="手机号">
              <el-input v-model="user.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
               <el-form-item prop="nickname" label="昵称">
              <el-input v-model="user.nickname" placeholder="请输入昵称"></el-input>
            </el-form-item>
               <el-form-item prop="realName" label="姓名">
              <el-input v-model="user.realName" placeholder="请输入姓名"></el-input>
            </el-form-item>
               <el-form-item prop="idCardNo" label="身份证号">
              <el-input v-model="user.idCardNo" placeholder="请输入身份证号"></el-input>
            </el-form-item>
               <el-form-item prop="address" label="地址">
              <el-input v-model="user.address" placeholder="请输入地址"></el-input>
            </el-form-item>
            <el-form-item prop="password" label="设置密码">
              <el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" icon @click="doRegister()">注册账号</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div>
  </template>
   
  <script>
  import axios from "axios";
  import qs from "qs";
  export default {
    name: "login",
    data() {
      return {
        user: {
          tel:"",
          username: "",
          nickname:"",
          realName:"",
          idCardNo:"",
          address:"",
          password: ""
        },
      };
    },
    created() {
      // console.log($);
      // console.log("1111");
    },
    methods: {
      doRegister() {
        if (!this.user.nickname) {
          this.$message.error("请输入用户名！");
          return;
        } else if (!this.user.tel) {
          this.$message.error("请输入手机！");
          return;
        } else if (!this.user.nickname) {
          this.$message.error("请输入昵称！");
          return;
        } else if (!this.user.realName) {
          this.$message.error("请输入真实姓名！");
          return;
        } else if (!this.user.idCardNo) {
          this.$message.error("请输入身份证号！");
          return;
        } else if (!this.user.password) {
          this.$message.error("请输入密码！");
          return;
        } else if (!this.user.address) {
          this.$message.error("请输入地址！");
          return;
        } 
           else {
            // this.$router.push({ path: "/" }); //无需向后台提交数据，方便前台调试
            axios
              .post(this.url+"/client/register", 
                qs.stringify({
                tel: this.user.tel,
                nickname: this.user.nickname,
                realName: this.user.realName,
                idCardNo: this.user.idCardNo,
                address: this.user.address,
                password: this.user.password
                }
              ))
              .then(res => {
                console.log("输出response.data", res.data);
                console.log("输出response.data.status", res.data.status);
                if (res.status === 200) {
                  this.$router.push({ path: "/" });
                } else {
                  alert("您输入的用户名已存在！");
                }
              });
          }
        }
      }
    }
  ;
  </script>
   
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped>
  .login {
    width: 100%;
    height: 100%;
    background: linear-gradient(145deg, #cf8553, #cf8553 50%, #5eb0c9, #4fd1f8 50%);
    background-size: cover;
    overflow: hidden;
  }
  .login-wrap {
    /* background: url("../assets/imgs/980.jpg") no-repeat; */
    /* background: rgba(5, 5, 0, 0.2); */
    background-size: cover;
    border-width: 400px;
    height: 500px;
    margin: 215px auto;
    overflow: hidden;
    padding-top: 10px;
    line-height: 20px;
    align-items: center;
    justify-content: center;
    border: 1px snow;
  }
   
  h3 {
    color: #000000b8;
    font-size: 24px;
  }
  hr {
    background-color: rgb(0, 0, 0);
    margin: 20px auto;
  }
   
  .el-button {
    width: 80%;
    margin-left: -50px;
  }
  </style>