
<template>
  <div style="background-color: #fcfcfc; font-family: '宋体'; height: 100%">
    <div>
      <my-bread
        level1="个人中心"
        level2="修改密码"
        :level3="levelName"
      ></my-bread>
    </div>
    <div style="margin-top: 25px; margin-left: 80px">
      <template>
    <!-- <div class="login clearfix">
      <div class="login-wrap">
        <el-row type="flex" justify="center">
          <el-form ref="loginForm" :model="user" status-icon label-width="80px" :disabled='false'>
            <hr>
            <el-form-item prop="tel" label="手机号">
              <el-input v-model="user.tel" placeholder="请输入手机号"></el-input>
            </el-form-item>
               <el-form-item prop="nickname" label="昵称">
              <el-input v-model="user.nickName" placeholder="请输入昵称"></el-input>
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
            <el-form-item>
            </el-form-item>
          </el-form>
        </el-row>
      </div>
    </div> -->
    <div model="user">
    <el-descriptions title="用户个人信息" direction="vertical" :column="4" border>
      <el-descriptions-item v-model="user.realName" label="姓名">{{user.realName}}</el-descriptions-item>
      <el-descriptions-item v-model="user.tel" label="手机号">{{user.tel}}</el-descriptions-item>
      <el-descriptions-item v-model="user.address" label="居住地" :span="2">{{user.address}}</el-descriptions-item>

      <el-descriptions-item label="备注">
        <el-tag size="small">用户</el-tag>
      </el-descriptions-item>
      <el-descriptions-item v-model="user.address" label="联系地址">{{user.address}}</el-descriptions-item>
      <el-descriptions-item v-model="user.idCardNo" label="身份证号">{{user.idCardNo}}</el-descriptions-item>
    </el-descriptions>
  </div>
  </template>

    </div>

    <div></div>
  </div>
</template>
<script>
import yu from "../assets/imgs/2.jpg";
import axios from "axios";
import qs from "qs";
export default {
  data() {
    return {
      src: yu,
      levelName: "",
      isCollapse: false,
      infomationShow: false,
      passwordShow: false,
      buttonName: "发送短信",
      isDisabled: false,
      time: 60,
      personalForm: {
        account: "",
        phone_num: "",
        verification: "",
        password1: "",
        password2: "",
      },
      user: {},
    };
  },
  methods: {
    async init() {
      //提交

      try {
        let res = await axios.post(
          this.url+"/client/info"
        );
        this.user = res.data;
        console.log(this.user);
      } catch (e) {
        console.log(e);
      }
    },
  },
   mounted() {
    this.init();
  },
};
</script>

<style>
.name {
  text-align: right;
}
.value {
  text-align: left;
}
</style>
