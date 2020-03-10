<template>
  <div class="detail">
    <div class="detail-content">
        <div class="detail-item">
            <span>ID:</span>
            <el-input
            v-model="detailData.id"
            disabled
            placeholder="请输入内容"
            style="margin-left:20px;"
            class="detail-item-input">
            </el-input>
        </div>
        <div class="detail-item">
            <span>日期:</span>
            <el-date-picker
                class="detail-item-input"
                v-model="detailData.date"
                type="date"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
            </el-date-picker>
        </div >
        <div class="detail-item">
            <span>名称: </span>
            <el-input v-model="detailData.name" placeholder="请输入内容" class="detail-item-input"></el-input>
        </div>
        <div class="detail-item">
                <span>状态:</span>
                <el-select v-model="detailData.status" placeholder="请选择" class="detail-item-input">
                    <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                </el-select>
            
        </div>
        <div class="detail-item">
            <p style="margin-top:5px; align-self:flex-start;">描述:</p>
                <el-input
                type="textarea"
                :rows="8"
                class="detail-item-input"
                placeholder="请输入内容"
                v-model="detailData.describe">
                </el-input>
        </div>
        <div class="add-btn">
            <el-button type="primary" size="small" @click="handleEdit">确定修改</el-button>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { tagText, DetailData, tagType, options} from '../config'
import { Getter, Action } from 'vuex-class'

@Component({})
export default class Edit extends Vue {
    @Action('GET_DETAIL') getDetail:any;

    @Action('UPDATE_LIST') update:any;

    @Getter('getDetail') detail:any;

    options = options;

    detailData: DetailData = {
        id: 0,
        date: '',
        name: '',
        status: 0,
        describe: ''
    }

    tagText(status:number) {
        return tagText(status);
    }

    tagType(status:number) {
        return tagType(status)
    }

    async mounted() {
        await  this.getDetail(this.$route.query);
        const {user} = this.detail;
        Object.keys(this.detailData).forEach(item => {
            item === 'status' 
                ? this.detailData[item] = Number(user[item])
                :this.detailData[item] = user[item]
        });
    }

    async handleEdit(){
        this.$confirm('确认修改该选项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                });
            await this.update(this.detailData);
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
.detail {
    width: 100%;
    background: url('../assets/edit.jpg');
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