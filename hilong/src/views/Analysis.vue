<template>
  <div class="analysis">
      <!-- <h1 >------事务数据展示-----</h1> -->
      <el-alert
        title=" 展示当前事项完成情况和今日事项，统计数据在图表下方"
        type="warning"
        style="margin-bottom:20px;"
        :closable="false"
        show-icon
    >
    </el-alert>
    <div class="analysis-item">
        <div id="analysis1" :style="{width: '600px', height: '300px'}" class="chartsText"></div>
        <span>事项完成情况 </span>
    </div>
    <div class="analysis-item">
        <div id="analysis2" :style="{width: '600px', height: '300px'}" class="chartsText"></div>
        <span>今日事项情况 </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import echarts from 'echarts'
import { Getter, Action } from 'vuex-class'
import {getNowFormatDate} from '../config';
@Component({})
export default class Analysis extends Vue {
    @Action('GET_LIST') getList:any;

    value = [];

    dateValue = [];

    async created() {
        const page = 1;
        const  date = getNowFormatDate();
        this.search(this.value,{page});
        this.search(this.dateValue,{page,date})
        // number.forEach(async (item) => {
        //     const list = await this.getList({status:item,date,page});
        //     this.dateValue.push(list.list.count);
        // });
    }
    async mounted(){
        this.drawLine();
        this.drawLine2();
    }

    search(value, params) {
        const number = [1,2,3,4];
        number.forEach(async (item) => {
            const list = await this.getList({status:item,...params});
            value.push(list.list.count);
        });
    }

    drawLine2() {
        // 基于准备好的dom，初始化echarts实例
        const analysis2 = echarts.init(document.getElementById('analysis2'));
        const date = this.dateValue;

        // 绘制图表
        setTimeout(()=>{
            analysis2.setOption({
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['已完成', '待进行', '进行中', '已删除'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '数量',
                        type: 'bar',
                        barWidth: '60%',
                        data: [...date]
                    }
                ],
                visualMap: {
                    show: false,
                    min: 10,
                    max: 800,
                    inRange: {
                        colorLightness: [0.6, 1]
                    }
                },
            });
        
        },100);
    }
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        const analysis1 = echarts.init(document.getElementById('analysis1'));
        const valueItem = this.value;
        // 绘制图表
        setTimeout(()=>{
            analysis1.setOption({
                series : [
                    {   
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        label:{
                            normal:{
                                    formatter:'{b}:{c}: ({d}%)',
                                    textStyle:{
                                        fontWeight:'normal',
                                        fontSize:15
                                }
                            }
                        },
                        data:[
                            {value:valueItem[0], name:'已完成数量',itemStyle:{
                                normal:{color:'#f0f9eb'}
                            }},
                            {value:valueItem[2], name:'待进行数量',itemStyle:{
                                normal:{color:'#fdf6ec'}
                            }},
                            {value:valueItem[3], name:'进行中数量',itemStyle:{
                                color:'#fef0f0'
                            }},
                            {value:valueItem[1], name:'已删除数量',itemStyle:{
                                color:'#f4f4f5'
                            }},
                        ]
                    },
                ],
                visualMap: {
                    show: false,
                    min: 10,
                    max: 800,
                    inRange: {
                        colorLightness: [0.6, 1]
                    }
                },
            });
        
        },100)
        
    }
}
</script>
<style lang="scss" scoped>
.analysis{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
    justify-content: center;
    .box-card {
        width: 480px;
    }
    .analysis-title {
        width: 100%;
        font-size: 20px;
        text-align: center;
        color:#666;
        margin: 10px 0;
    }
    .analysis-item{
        width: 600px;
        border: 1px solid #eee;
        padding: 10px 0;
        margin-right:5px ;
        overflow: hidden;
        text-align: center;
    }
}

</style>