<style scoped>
.el-row{
  height: 100%;
}

.el-menu{
  border-right:none;
}
.el-aside{
  border-right: 1px solid #f5f1f1;
}
</style>

<template>
  <el-aside width="200px">
    <el-row class="tac">
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="goPage('Couriers_1')">
            <i class="el-icon-menu"></i>
            <span slot="title">历史订单</span>
          </el-menu-item>

          <el-menu-item index="2" @click="goPage('Couriers_2')">
            <i class="el-icon-s-order"></i>
            <span slot="title">待处理订单</span>
          </el-menu-item>

          
          <el-menu-item index="3" @click="goPage('Couriers_3')">
            <i class="el-icon-user"></i>
            <span slot="title">服务员信息</span>
          </el-menu-item>

          <el-menu-item index="4" @click="goPage('Couriers_4')">
            <i class="el-icon-user"></i>
            <span slot="title">智能客服</span>
          </el-menu-item>

        </el-menu>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
var $this = {}
export default {
  data () {
    return {}
  },
  beforeCreate () {
    $this = this
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },

    goPage (link) {
      if (link === 'Couriers_1') {
        $this.$router.push('/Couriers_1').catch(error => error)
      } else if ((link === 'Couriers_2')) {
        $this.$router.push('/Couriers_2').catch(error => error)
      } else if ((link === 'Couriers_3')){
        $this.$router.push('/Couriers_3').catch(error => error)
      }else if ((link === 'Couriers_4')){
        $this.$router.push('/Couriers_4').catch(error => error)
      }
    }
  }
}
</script>
