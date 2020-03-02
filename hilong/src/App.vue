<template>
  <div id="app">
    <el-header v-if="showHead()">
        <el-menu
        :default-active="activeIndex2"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        text-color="#409eff"
        active-text-color="#1989fa">
        <el-menu-item >事务管理系统</el-menu-item>
        <el-menu-item index="2">个人中心</el-menu-item>
        <el-menu-item index="3" class="head-icon">
          <el-avatar icon="el-icon-user-solid"></el-avatar>
        </el-menu-item>
        </el-menu>
    </el-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component({})
export default class App extends Vue {
    activeIndex2 = '1'

    @Watch('$route')
    showHead() {
        return this.$route.name !== 'Login'
    }
    handleSelect(key: string|number, keyPath: string|number) {
        console.log(key, keyPath);
    }
}
</script>
<style lang="scss" scoped>
#app {
  .el-header {
    padding: 0;
    overflow: hidden;
    .el-submenu__title {
        background-color: #ffffff !important;
        &:hover{
            background-color: #ffffff !important;
        }
    }
    .el-menu-item{
        background-color: #ffffff !important;
    }
    .el-menu-item:hover{
       background-color: #ffffff !important;
    }
    .head-icon {
      float: right;
    }
  }
}
</style>
