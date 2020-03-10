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
import { Getter, Action } from 'vuex-class'

@Component({})
export default class Detail extends Vue {
    @Action('GET_DETAIL') getDetail:any;

    @Getter('getDetail') detail:any;

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
            this.detailData[item] = user[item]
        });
    }

}
</script>
<style lang="scss" scoped>
.detail {
    width: 100%;
    height: calc(100% - 100px);
    background: url('../assets/s.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    padding: 20px 0;
    .detail-content {
        width: 500px;
        display: flex;
        padding: 20px;
        background: rgba($color: #ffffff, $alpha: 0.7);
        flex-direction: column;
        align-items: center;
        color: #696969;
        .detail-item {
            width: 300px;
            display: flex;
            flex-wrap: wrap;
            padding: 10px;
        }
    }
}
</style>