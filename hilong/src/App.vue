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
        <el-menu-item >事项管理系统</el-menu-item>
        <el-menu-item index="0">首页</el-menu-item>
        <el-menu-item index="1">新增事项</el-menu-item>
        <el-menu-item index="3">数据分析</el-menu-item>

        <el-submenu  index="2" class="head-icon">
               <template slot="title">
                    <el-avatar :size="60" src="https://empty" @error="errorHandler">
                        <img :src="headIcon"/>
                    </el-avatar>
               </template>
                <el-menu-item index="2" style="text-align:center;color:#3D3D3D"><i class="el-icon-user-solid"></i>个人中心</el-menu-item>
                <el-menu-item index="4" style="text-align:center;color:#3D3D3D"><i class="el-icon-delete"></i>退出登录</el-menu-item>
        </el-submenu >
        </el-menu>
    </el-header>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'
import { Getter, Action } from 'vuex-class'

@Component({})
export default class App extends Vue {
    @Action('GET_USER') getUser:any;

    @Getter('getUser') user:any;

    get activeIndex() {
        const routes = {
            home:0,
            add:1,
            person:2,
            analysis:3
        }
        const name = window.location.hash.split('/')[1];
        const active = routes[name]+''
        return active;
    }
    headIcon = '';

    async created() {
        const userName = localStorage.getItem('user');
        await this.getUser({userName});
        const {headIcon} = this.user.user;
        this.headIcon = headIcon;
    }

    errorHandler() {
      return true
    }
    @Watch('$route')
    showHead() {
        return this.$route.name !== 'Login' && this.$route.name !== 'NotFound'
    }

    handleSelect(key: any) {
        const routeName = ['Home', 'Add', 'Person', 'Analysis','Login'];
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
