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
          <el-menu-item index="1" @click="goPage('manage')">
            <i class="el-icon-menu"></i>
            <span slot="title">快递员管理</span>
          </el-menu-item>

          <el-menu-item index="2" @click="goPage('order')">
            <i class="el-icon-s-order"></i>
            <span slot="title">快递管理</span>
          </el-menu-item>

          <!-- <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>测试3</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1">测试3-1</el-menu-item>
            </el-menu-item-group>
          </el-submenu> -->
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
      if (link === 'manage') {
        $this.$router.push('/manage').catch(error => error)
      } else if ((link === 'order')) {
        $this.$router.push('/order').catch(error => error)
      } else {}
    }
  }
}
</script>
