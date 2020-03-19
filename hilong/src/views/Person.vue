<template>
  <div class="detail">
    <div class="detail-content">
        <div class="detail-item">
            <span>昵称:</span>
            <el-input
            v-model="model.userName"
            disabled
            placeholder="请输入内容"
            class="detail-item-input">
            </el-input>
        </div>
        <div class="detail-item">
            <span>密码: </span>
            <el-input show-password v-model="model.passWord" placeholder="请输入内容" class="detail-item-input"></el-input>
        </div>

        <el-upload
            class="avatar-uploader"
            action="http://localhost:3000/upload"
            :show-file-list="false"
            :on-success="afterUpload"
        >
            <img v-if="model.headIcon" :src="model.headIcon" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div class="add-btn">
            <el-button type="primary" size="small" @click="handleEdit">确定修改</el-button>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { options} from '../config'
import { Getter, Action } from 'vuex-class'

@Component({})
export default class Person extends Vue {
    @Action('GET_USER') getUser:any;

    @Action('UPDATE_USER') updateUser:any;

    @Getter('getUser') user:any;

    options = options;

    model = {
        userName: '',
        passWord:'',
        headIcon: ''
    }

    async created() {
        const userName = localStorage.getItem('user');
        await this.getUser({userName});
        const {passWord,headIcon} = this.user.user;
        this.model.passWord = passWord;
        this.model.userName = userName;
        localStorage.setItem('headIcon',headIcon);
        
    }

    afterUpload(res) {
        this.model.headIcon = res.url
    }


    async handleEdit() {
        this.$confirm('确认修改该选项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            await this.updateUser(this.model);
            this.$router.push('/');
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消修改'
            });          
        });
    }
    
}
</script>
<style lang="scss" scoped>

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    border: 1px dashed #d9d9d9;
    text-align: center;
  }

.detail {
    width: 100%;
    height:100%;
    background: url('../assets/person.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    .detail-content {
        width: 500px;
        display: flex;
        padding: 10px;
        background: rgba($color: #ffffff, $alpha: 0.7);
        flex-direction: column;
        align-items: center;
        color: #696969;
        .detail-item {
            width: 300px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            padding: 10px;
            .detail-item-input{
                width: 220px;
                margin-left:5px; 
            }
        }
    }
    .add-btn {
        width: 100%;
        padding-right: 50px;
        text-align: right;
    }
}
</style>