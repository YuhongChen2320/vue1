<style scoped>
.el-aside {
    display: flex;
    justify-content: center;
    align-items: center;
}

section{
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.logo {
  width: 200px;
}

.headerLogo,.logo{
  cursor: pointer;
}

</style>

<template>
  <el-container>
    <el-aside width="auto" class="header-logo tap" >
      <img class="logo" src="@/assets/imgs/logo.png" alt="Logo" />
    </el-aside>

    <el-aside width="auto" class="header-logo tap" >
      <a href="#" @click.prevent="logout" >
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" ></el-avatar>
      </a>
      <!-- <el-avatar icon="el-icon-user-solid" class="headerLogo" @click.prevent="logout"></el-avatar> -->
    </el-aside>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      activeIndex: '1'
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout(){//退出功能
            //弹出确认对话框
            //用户点击确认，跳回用户登录页面，清除token
                this.$confirm('确定要退出登录吗?', '提示', {
                   confirmButtonText: '确定',
                   cancelButtonText: '取消',
                   type: 'warning'
                  }).then(() => {
                    this.$message({
                       type: 'success',
                       message: '退出成功!'
                     });
                     //确认退出，清除token
                     localStorage.removeItem('token')
                     //跳转登录页面(编程式导航)
                     this.$router.push('/')

                }).catch(() => {
              this.$message({
               type: 'info',
               message: '已取消退出'
          });          
        });

          } 
  }
}
</script>
