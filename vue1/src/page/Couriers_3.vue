<template>
  <div style="background-color:#FCFCFC;font-family: '宋体'; height: 100%">
      <!-- <div>
          <my-bread level1='个人中心' level2='修改密码' :level3="levelName"></my-bread>
      </div> -->
      <div style="margin-top:25px;margin-left:80px;">
          <el-row :gutter="10">
              <el-col :span="2">
                  <div style="background-color:#FFEBCD;width:60px;height:60px;display:inline-block;border-radius:50%;overflow:hidden;">
                      <el-image :src="src" style="width:60px;height:60px;"></el-image>
                  </div>
                  <div style="margin-top:5px;margin-left:6px;"><span>{{ servicerInfo.name }}</span></div>
                  <div style="margin-top:50px;margin-left:1px;"><el-button type="text" style="font-size:15px;color:#4D4D4D;"  @click="infomationClick()">个人信息<span style="color:#B0E0E6;" v-show="infomationShow" class="el-icon-s-promotion"></span></el-button></div>
                  <div style="margin-top:5px;margin-left:1px;"><el-button type="text" style="font-size:15px;color:#4D4D4D;" @click="passwordClick()">修改密码<span style="color:#B0E0E6;" v-show="passwordShow" class="el-icon-s-promotion"></span></el-button></div>
              </el-col>

              <el-col :span="21">
                  <el-row :gutter="10" style="margin-top:20px;">
                      <el-col :span="2"><div style="text-align:right;"><span>账号：</span></div></el-col>
                      <el-col :span="5">0000000000</el-col>
                  </el-row>
                  <!-- 个人信息 -->
                  <el-row v-show="infomationShow">
                      <el-card style="margin-top:30px;">
                          <el-row>
                              <el-col :span="6">
                                  <el-row :gutter="12" style="margin-top:20px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>姓名：</span></div></el-col>
                                      <el-col :span="16">{{ servicerInfo.name }}</el-col>
                                  </el-row>
                                  <el-row :gutter="12" style="margin-top:30px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>手机号：</span></div></el-col>
                                      <el-col :span="16">{{ servicerInfo.phone }}</el-col>
                                  </el-row>
                                  <el-row :gutter="12" style="margin-top:30px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>评分：</span></div></el-col>
                                      <el-col :span="16">{{ servicerInfo.rating }}</el-col>
                                  </el-row>
                                  <el-row :gutter="12" style="margin-top:30px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>服务类型：</span></div></el-col>
                                      <el-col :span="16">{{ servicerInfo.type }}</el-col>
                                  </el-row>
                                  <el-row :gutter="12" style="margin-top:30px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>年龄：</span></div></el-col>
                                      <el-col :span="16">{{ servicerInfo.age }}</el-col>
                                  </el-row>
                                  <el-row :gutter="12" style="margin-top:30px;">
                                      <el-col :span="8"><div style="text-align:right;"><span>性别：</span></div></el-col>
                                      <el-col :span="16">{{ servicerInfo.gender }}</el-col>
                                  </el-row>
                              </el-col>
                              <el-col :span="18">
                                  <el-row>
                                      <el-col>
                                          <el-timeline>
                                              <el-timeline-item v-for="(order, index) in orderList" v-bind:key="index" v-bind:timestamp="order.createtime" placement="top">
                                                  <el-card>
                                                      <div><span><span style="font-family:'微软雅黑';font-size:15px;"><strong>服务单号</strong></span><span style="font-family:'微软雅黑'; font-size:15px;margin-left:20px;"><strong>{{ order.orderno }}</strong></span></span></div>
                                                      <div><strong>服务时间: </strong>{{ order.starttime}} - {{ order.endtime}}</div>
                                                      <div><strong>服务用户: </strong>{{ order.sname}}     <strong>服务内容：</strong>{{ order.pname}}     <strong>服务费用：</strong>{{ order.price}}</div>
                                                  </el-card>
                                              </el-timeline-item>
                                          </el-timeline>
                                      </el-col>
                                  </el-row>
                              </el-col>
                          </el-row>
                      </el-card>
                  </el-row>
                  <!-- 修改密码 -->
                  <!-- <el-row v-show="passwordShow">
                      <el-card style="margin-top:30px;">
                          <el-form :model="personalForm">
                              <el-row :gutter="12" style="margin-top:20px;">
                                  <el-col :span="6">
                                      <div style="text-align:right;"><span>账号：</span></div>
                                  </el-col>
                                  <el-col :span="5">
                                      <el-form-item prop="account">
                                          <el-input type="text" v-model="personalForm.account" placeholder="请输入您的账号" ></el-input>
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row :gutter="12" style="margin-top:1px;">
                                  <el-col :span="6">
                                      <div style="text-align:right;"><span>手机号：</span></div>
                                  </el-col>
                                  <el-col :span="5">
                                      <el-form-item prop="phone_num">
                                          <el-input type="text" v-model="personalForm.phone_num" placeholder="绑定的手机号" ></el-input>
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row :gutter="12" style="margin-top:1px;">
                                  <el-col :span="6">
                                      <div style="text-align:right;"><span>密码：</span></div>
                                  </el-col>
                                  <el-col :span="5">
                                      <el-form-item prop="password1">
                                          <el-input type="password" show-password v-model="personalForm.password1" placeholder="请输入新的密码" ></el-input>
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row :gutter="12" style="margin-top:1px;">
                                  <el-col :span="6">
                                      <div style="text-align:right;"><span>确认密码：</span></div>
                                  </el-col>
                                  <el-col :span="5">
                                      <el-form-item prop="password2">
                                          <el-input type="password" show-password v-model="personalForm.password2" placeholder="请再次输入新的密码" ></el-input>
                                      </el-form-item>
                                  </el-col>
                              </el-row>
                              <el-row :gutter="12" style="margin-top:1px;">
                                  <el-col :span="6">
                                      <div style="text-align:right;"><span>验证码：</span></div>
                                  </el-col>
                                  <el-col :span="5">
                                      <el-form-item prop="verification">
                                          <el-input type="text" v-model="personalForm.verification" placeholder="验证码" ></el-input>
                                      </el-form-item>
                                  </el-col>
                                  <el-col :span="2">
                                      <el-button type="primary" plain round size="medium" @click="sendMsg()" :disabled="isDisabled">{{ buttonName }}</el-button>
                                  </el-col>
                              </el-row>
                              <el-row :gutter="12" style="margin-top:10px;">
                                  <el-col :span="17" style="text-align:center;">
                                      <el-button type="primary" plain round size="medium" @click="submit()">修改</el-button>
                                  </el-col>
                              </el-row>
                          </el-form>
                      </el-card>
                  </el-row> -->
              </el-col>
          </el-row>
      </div>
      
      <div>

      </div>
  </div>
</template>
<script>
import axios from 'axios'
axios.defaults.baseURL = "http://172.17.170.29:8080/";
// import yu from 'D:/gongcheng/admin-menu-2.0/src/assets/logo.png'

export default {
  data(){
      return {
          src:"图片地址",
          levelName:'',
          infomationShow:true,
          passwordShow:false,
          buttonName:"发送短信",
          isDisabled:false,
          time:60,
          personalForm:{
              account:"",
              phone_num:"",
              verification:"",
              password1:"",
              password2:"",
          },
          servicerInfo:{
              "id": 1,
              "name": "jie",
              "phone": "12345676",
              "rating": 4.0,
              "type": 1,
              "age": 22,
              "gender": "男"
          },
          orderList: []
      }
  },
  beforeCreate: function(){
      let mythis = this
      //获取服务员信息（这里暂时获取 id 为 3 的服务员）
      axios.post("servicer/getinfobyid",
          {"id": 3},
          {
              headers: {
                  "token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNzU1ZjYwNy1lZGZhLTQwNzktOWIxYi04MDI5OGJhYTkxODQiLCJpYXQiOjE2ODA0Mjc5OTksImlzcyI6Inh4eCIsImV4cCI6MTcxMTk2Mzk5OSwidXNlcklkIjoiNzU3In0.JgmZ8TcLtWF9py4nUwl0c9t9RzjdmQE3eOBoCdtIujI"
              }
          }
      ).then((res) =>  {
          console.log(res)
          this.servicerInfo = res.data;
          //获取当前快递员已完成的订单
          axios.post("/order/getorderbycondi",
              {"sid": 3},
              {
                  headers: {
                      "token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiJhNzU1ZjYwNy1lZGZhLTQwNzktOWIxYi04MDI5OGJhYTkxODQiLCJpYXQiOjE2ODA0Mjc5OTksImlzcyI6Inh4eCIsImV4cCI6MTcxMTk2Mzk5OSwidXNlcklkIjoiNzU3In0.JgmZ8TcLtWF9py4nUwl0c9t9RzjdmQE3eOBoCdtIujI"
                  }
              }
          ).then((res) => {
              console.log(res);
              let orderList = res.data;
              for(let i = orderList.length - 1; i >= 0; i--){
                  if(orderList[i]['state'] != '已完成'){
                      orderList.splice(i, 1)
                  }
              }
              mythis.orderList = orderList
              console.log(mythis.orderList)
          })

      }).catch((error) => {
          console.log(error);
      });
      
  },
  methods:{

  }
}
</script>

<style>
  .name{ text-align: right; }
  .value{ text-align: left; }
</style>
