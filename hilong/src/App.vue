<template>
  <div id="app">
    <el-header v-if="showHead()"
      class="head"
    >
    <el-menu
        :default-active="activeIndex"
        class="el-menu"
        mode="horizontal"
        @select="handleSelect"
        background-color="#fff"
        text-color="#409eff"
        active-text-color="#1989fa">
        <el-menu-item >事务管理系统</el-menu-item>
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1">新增事务</el-menu-item>
        <el-menu-item index="2" class="head-icon">
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
    activeIndex = '0'
    @Watch('$route')
    showHead() {
        return this.$route.name !== 'Login' && this.$route.name !== 'NotFound'
    }

    handleSelect(key: any) {
        const routeName = ['Home', 'Add', 'Person'];
        (this as any).$router.push({name: routeName[key]})
    }
}
</script>
<style lang="scss" scoped>
#app {
	width: 100%;
	height: 100%;
  .head{
    border-bottom: 1px solid #e6e6e6;
  }
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
