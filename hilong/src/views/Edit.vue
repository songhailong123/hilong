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
            <el-button type="primary" size="small">确定修改</el-button>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { tagText, DetailData, tagType, options} from '../config'
@Component({})
export default class Edit extends Vue {
    options = options;
    detailData: DetailData = {
        id: 1,
        date: '2020-03-05',
        name: '啊嘿啊嘿嘿啊',
        status: '',
        describe: '啊哈哈哈哈哈哈哈哈哈哈哈'
    }

    tagText(status:number) {
        console.log(status)
        return tagText(status);
    }

    tagType(status:number) {
        return tagType(status)
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