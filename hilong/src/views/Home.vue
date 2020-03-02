<template>
  <div class="home">
    <div class="home-btn">
        <el-button type="primary" size="small" class="home-el-btn">新增事务</el-button>
        <el-input
            class="home-search"
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input2">
        </el-input>
    </div>
    <div class="search-content">
        <div>
            <label >ssss</label>
            <el-select v-model="statusValue" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="block">
            <span class="demonstration">默认</span>
            <el-date-picker
            v-model="dateValue"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </div>

    </div>
    <el-container>
        <el-table
            :data="tableData"
            :default-sort = "{prop: 'id'}"
            style="width: 100%;margin-top:20px;border-top:1px solid #EBEEF5;">
            <el-table-column
                label="ID"
                prop="id"
                sortable
                >
                <template slot-scope="scope">
                    <span>{{ scope.row.id  }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="date"
                sortable                
                label="日期"
                >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="名称"
                >
                <template slot-scope="scope">
                    <span>{{ scope.row.name  }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="状态"
                >
                <template slot-scope="scope">
                    <el-tag
                        :type="tagType(scope.row)"
                        disable-transitions>{{tagText(scope.row)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">详情</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-container>
    <el-pagination
        background
        class="pagination"
        layout="prev, pager, next"
        :total="1000">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
enum tagStatusText {
    success = 0,
    info = 1,
    warning = 2,
    danger = 3 
}
@Component({})
export default class Home extends Vue {
    input2 = '';

    statusValue = '';

    dateValue = '';
        options=[{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
    tableData = [
        {
            id: 1,
            status:1,
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        },
        {
            id: 2,
            status:2,
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
        },
        {
            id: 3,
            status:3,
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
        },
        {
            id: 4,
            status:0,
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
        }
    ]

    tagType( row:any ) {
        const {status} = row;
        console.log(tagStatusText[1])
        return tagStatusText[status]
    }
    tagText( row:any ) {
        const {status} = row;
        const result = ['已完成','已删除','待进行','进行中'];
        return result[status];
    }
    handleEdit(index: string|number, row: string|number) {
        console.log(index, row);
    }
    handleDelete(index: string|number, row: string|number) {
      console.log(index, row);
    }
}
</script>
<style lang="scss" scoped>
.home {
    padding: 10px;
    margin-top:10px;
    border-top:3px solid #f3f3f3;
    .search-content {
        width: 100%;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
    }
    .home-btn {
        width: 100%;
        overflow: hidden;
        margin-top:10px; 
        display: flex;
        .home-search{
            margin-left: auto; 
            width: 300px;
        }
    }
    .pagination{
         float: right;
         overflow: hidden;
         margin:15px; 
    }
}
</style>