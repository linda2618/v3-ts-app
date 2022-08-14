<template>
  <div class="home">
    <!-- 头部 -->
    <el-container>
      <el-header height="80px">
        <el-row :gutter="20">
          <el-col :span="4">
            <img class="logo" alt="Vue logo" src="../assets/logo.png">
          </el-col>
          <el-col :span="16">
            <h1> 后台管理系统</h1>
          </el-col>
          <el-col :span="4">
            <el-button class="btn-text" type="primary" link>
              退出
            </el-button>
          </el-col>
        </el-row>
      </el-header>

      <!-- 侧边栏 -->
      <el-container>
        <el-aside width="200px">
          <el-menu router active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
            default-active="1" text-color="#fff">
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
import { useRouter } from 'vue-router'


const router = useRouter()

const list = router.getRoutes().filter(v => v.meta.isShow)
// console.log(list);





// import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue';

// export default defineComponent({
//   name: 'HomeView',
//   components: {
//     HelloWorld,
//   },
// });
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
  background-color: #545c64;
}

.el-aside {
  .el-menu {
    height: calc(100vh - 80px);
  }
}

.el-main {
  height: calc(100vh - 80px);
  // 如果内容溢出了元素内容区域，是否对内容的上/下边缘进行裁剪。
  // auto:如果溢出框，则应该提供滚动机制。
  overflow-y: auto;
}
</style>