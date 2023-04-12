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
          <el-menu-item index="1" @click="goPage('user_1')">
            <i class="el-icon-menu"></i>
            <span slot="title">我的快递</span>
          </el-menu-item>

          <el-menu-item index="2" @click="goPage('user_2')">
            <i class="el-icon-s-order"></i>
            <span slot="title">我要寄件</span>
          </el-menu-item>

          
          <el-menu-item index="2" @click="goPage('user_3')">
            <i class="el-icon-user"></i>
            <span slot="title">个人信息</span>
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
      if (link === 'user_1') {
        $this.$router.push('/user_1').catch(error => error)
      } else if ((link === 'user_2')) {
        $this.$router.push('/user_2').catch(error => error)
      } else if ((link === 'user_3')){
        $this.$router.push('/user_3').catch(error => error)
      }
    }
  }
}
</script>
