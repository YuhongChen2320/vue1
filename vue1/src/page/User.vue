<style>
.el-main {
  background-color: #f5f7f9;
}

.el-header,
.el-footer {
  background-color: white;
  box-sizing: border-box;
  border-bottom: 1px solid #f5f1f1;
}

.el-container {
  height: 100%;
}
</style>

 <template>
  <el-container>
    <!-- header部分 -->
    <el-header>
      <navtop></navtop> <!-- 自定义组件 -->
    </el-header>

    <el-container>
       <!-- aside部分 -->
      <leftNav></leftNav>  <!-- 自定义组件 -->
      <el-main>
         <!-- main部分  router-view 当你的路由path 与访问的地址相符时，会将指定的组件替换该 router-view -->
        <router-view />
      </el-main>
    </el-container>
    
  </el-container>
</template>

<script>
import navtop from '@/components/nav-top.vue'
import leftNav from '@/components/nav_user.vue'
export default {
  name:'User',
  components: {
    navtop,
    leftNav
  },
  data () {
    return {}
  },
  methods: {}
}
</script>
