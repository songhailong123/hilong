<template>
<div class="login-box">
        <!-- 通过:rules="loginFormRules"来绑定输入内容的校验规则 -->
        <el-form :rules="loginFormRules" ref="loginForm" :model="loginForm" label-position="right" label-width="auto" show-message>
            <span class="login-title">欢迎登录</span>
            <div style="margin-top: 5px"></div>
            <el-form-item label="用户名" prop="userName">
                <el-col :span="22">
                    <el-input type="text" v-model="loginForm.userName"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="密码" prop="passWord">
                <el-col :span="22">
                    <el-input type="password" v-model="loginForm.passWord"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loginSubmit('loginForm')">登录</el-button>
                <el-button type="primary" @click="onRegit">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Form } from "element-ui";
import { Getter, Action } from 'vuex-class'

@Component({})
export default class Login extends Vue {
    @Action('GET_USER') getUser:any;

    @Action('CREATE_USER') createUser:any;

    @Getter('getUser') user:any;

    loginForm={
        userName: '',
        passWord: ''
    }
    // 表单验证，需要在 el-form-item 元素中增加 prop 属性
    loginFormRules= {
        userName: [
            {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        passWord: [
            {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
    }

    // 登陆验证
    async loginSubmit(loginForm:object) {
        const name =this.loginForm.userName
        await this.getUser({userName:name});
        const {userName,passWord} = this.user.user;
        // 为表单绑定验证功能
        (this.$refs['loginForm'] as Form).validate((valid:any) => {
            if (valid) {
                if(this.loginForm.userName  === userName && this.loginForm.passWord ===passWord) {
                    this.$message({
                        message: '恭喜你，登陆成功',
                        type: 'success'
                    });
                    localStorage.setItem('user',userName);
                    this.$router.replace('/');
                } else {
                    this.$message.error('登陆失败,密码或用户名错误');
                }
            } else {
                return false;
            }
        });
    }
    // 注册验证
    async onRegit() {
        const {userName,passWord} = this.loginForm;
        await this.getUser({userName});
        const {user} = this.user;
        // 为表单绑定验证功能
        (this.$refs['loginForm'] as Form).validate((valid:any) => {
            if (valid) {
                if(user.id) {
                    this.$alert('该用户已存在', '提示', {
                        confirmButtonText: '确定',
                    });
                } else {
                    this.createUser(this.loginForm);
                    this.$alert('创建成功', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                                message: '恭喜你，登陆成功',
                                type: 'success'
                            });
                            localStorage.setItem('user',userName);
                            this.$router.replace('/');
                        }
                    });
                }
            } else {
                return false;
            }
        });



    }

}
</script>
<style lang="scss" scoped>
    .login-box {
        border: 1px solid #DCDFE6;
        width: 350px;
        margin: 180px auto;
        padding: 35px 35px 15px 35px;
        border-radius: 5px;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        box-shadow: 0 0 25px #1989fa;
    }
    .login-title {
        text-align: center;
        margin: 0 auto 40px auto;
        color: #1989fa;
        font-size: 30px;
        font-weight: bold;
    }
</style>