<template>
  <div class="detail">
    <div class="detail-content">
        <div class="detail-item">
            <span>ID:&nbsp;&nbsp;&nbsp;{{detailData.id}}</span>
        </div>
        <div class="detail-item">
            <span>日期:&nbsp;&nbsp;&nbsp;{{detailData.date}}</span>
        </div >
        <div class="detail-item">
            <span>名称:&nbsp;&nbsp;&nbsp;{{detailData.name}}</span>
        </div>
        <div class="detail-item">
            <span>
                状态:&nbsp;&nbsp;&nbsp;
                <el-tag
                    :type="tagType(detailData.status)"
                    disable-transitions>
                        {{tagText(detailData.status)}}
                </el-tag>
            </span>
        </div>
        <div class="detail-item">
            <span>描述:&nbsp;&nbsp;&nbsp;{{detailData.describe}}</span>
        </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { tagText, DetailData, tagType} from '../config'
@Component({})
export default class Detail extends Vue {
    detailData: DetailData = {
        id: 1,
        date: '2020-03-05',
        name: '啊嘿啊嘿嘿啊',
        status: 0,
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
    height: 100%;
    background: url('../assets/detail.jpg');
    background-size: cover;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    .detail-content {
        width: 500px;
        display: flex;
        padding: 20px;
        background: rgba($color: #ffffff, $alpha: 0.4);
        flex-direction: column;
        align-items: center;
        color: #696969;
        .detail-item {
            width: 300px;
            display: flex;
            flex-wrap: wrap;
            justify-content: start;
            padding: 10px;
        }
    }
}
</style>