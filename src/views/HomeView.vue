<template>
  <div class="home">
    <!-- 头部 -->
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <img class="logo" alt="Vue logo" src="../assets/city.jpg">
          </el-col>
          <el-col :span="16">
            <h1> 后台管理系统</h1>
          </el-col>
          <el-col :span="4">
            <el-button @click="goBack" class="btn-text" type="primary" link >
              退出
            </el-button>
          </el-col>
        </el-row>
      </el-header>

      <!-- 侧边栏 -->
      <el-container>
        <el-aside width="200px">
          <el-menu router  class="el-menu-vertical-demo"
            :default-active="active" text-color="#fff">
            <el-menu-item v-for="item in list" :key="item.path" :index="item.path">
              <el-icon>
                <icon-menu />
              </el-icon>
              <span>{{ item.meta.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>

        <!-- 主体内容区域 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()
const active = route.path

const list = router.getRoutes().filter(v => v.meta.isShow)
// console.log(list);
const goBack = () => {
  //清除token值
  sessionStorage.removeItem("token")
  router.push('/login')
  ElMessage({
                type: 'success',
                message: `退出登录`,
            })

}


</script>

<style lang="less" scoped>
.logo {
  height: 80px;
}

h1 {
  text-align: center;
  color: #fff;
  height: 80px;
  line-height: 80px;
}


.btn-text {
  text-align: right !important;
  height: 80px;
  line-height: 80px;
  color: #fff;
}



.el-header {
  background-color: #4e7dac;
}

.el-aside {

  .el-menu {
  background-color: #3a77b4;
    height: calc(100vh - 80px);
  }
  .el-menu-item:hover{
    background-color: #246985;
  }
 
}

.el-main {
  height: calc(100vh - 80px);
  // 如果内容溢出了元素内容区域，是否对内容的上/下边缘进行裁剪。
  // auto:如果溢出框，则应该提供滚动机制。
  overflow-y: auto;
}
</style>