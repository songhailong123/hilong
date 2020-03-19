<template>
  <div class="home">
    <div class="home-btn">
        <el-button
        type="primary" 
        size="small"
        @click="addTransaction"
        class="home-el-btn">新增事项</el-button>
        <el-input
            class="home-search"
            placeholder="请输入内容"
            @change="handleInput"
            clearable
            prefix-icon="el-icon-search"
            v-model="searchData">
        </el-input>
    </div>
    <div class="search-content">
        <div>
            <label class="label">状态:</label>
            <el-select v-model="statusValue"  clearable  @change="handleStatus" placeholder="请选择">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="block">
            <label class="label">日期:</label>
            <el-date-picker
            v-model="dateValue"
            @change="handleDate"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            type="date"
            placeholder="选择日期">
            </el-date-picker>
        </div>

    </div>
    <el-container>
        <el-table
            :data="tableData"
            size='mini'
            :default-sort = "{prop: 'id'}"
            style="width: 100%;margin-top:10px;border-top:1px solid #EBEEF5;">
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
                        :type="tagType(scope.row.status)"
                        disable-transitions>{{tagText(scope.row.status)}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleDetail(scope.row)">详情</el-button>
                    <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                    <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-container>
    <el-pagination
        background
        class="pagination"
        @current-change="handlePage"
        layout="prev, pager, next"
        :total="page">
    </el-pagination>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import axios from 'axios';
import {tagStatusText, tagText, tagType, options} from '../config'
import Detail from './Detail.vue';
import { Getter, Action } from 'vuex-class'


@Component({})
export default class Home extends Vue {
    @Action('GET_USER') getUser:any;

    @Action('GET_LIST') getList:any;

    @Action('DELETE_LIST') deleteList:any;


    @Getter('getList') list:any;

    @Getter('getUser') user:any;
    
    searchData = '';
    page = 0;
    pageCount = 1;
    statusValue = '';

    dateValue = '';
    options = options;
    tableData = [];
    userName = '';
    
    async created() {
        const userName = localStorage.getItem('user');
        this.userName = userName;
        await this.getUser({userName});
        const {user} = this.user;
        if(!user.id){
            this.$router.push('/login')
        }
        await this.getList({userName,page:1});
        this.tableData = this.list.list.rows;
        this.page = this.list.list.count;
    }

    tagText(status:number) {
        return tagText(status);
    }

    tagType(status:number) {
        return tagType(status)
    }


    // 跳转到详情页
    handleDetail({id}:number|any) {
        this.$router.push({
            name: 'Detail',
            query:{
                id:id
            }
        });
    }

    // 表格数据
    async changeTable(params:object,) {
        const userName = this.userName;
        await this.getList({userName,...params});
        this.tableData = this.list.list.rows;
        this.page = this.list.list.count;
    }
    
    // 状态查询
    handleStatus() {
        const search = {};
        this.statusValue&&(search['status'] = Number(this.statusValue));
        this.dateValue&&(search['date'] = this.dateValue);
        search['page'] = 1;
        this.changeTable(search);
    }

    // 输入查询
    handleInput(){
        const search = {};
        this.searchData&&(search['id'] = Number(this.searchData));
        search['page'] = 1;
        this.changeTable(search);
    }

    // 日期查询
    handleDate() {
        const search = {};
        this.statusValue&&(search['status'] = Number(this.statusValue));
        this.dateValue&&(search['date'] = this.dateValue);
        search['page'] = 1;
        this.changeTable(search);
    }

    // 分页
    handlePage(currentPage:number|string) {
        const search = {};
        this.pageCount = Number(currentPage);
        this.statusValue&&(search['status'] = this.statusValue);
        this.dateValue&&(search['date'] = this.dateValue);
        this.searchData&&(search['id'] = Number(this.searchData));
        search['page'] = Number(currentPage);
        this.changeTable(search);
    }
    // 跳转到新增页
    addTransaction() {
        this.$router.push('/add')
    }
    
    // 跳转到编辑页
    handleEdit({id}:number|any) {
        this.$router.push({
            name: 'Edit',
            query:{
                id:id
            }
        })
    }
    // 删除
    handleDelete({id}) {
        const userName = this.userName;
        id = (typeof id === 'number') ? id : Number(id);
        this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(async () => {
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                await this.deleteList({id,userName});
                this.handlePage(this.pageCount);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
            });          
        });
    }
}
</script>
<style lang="scss" scoped>
.home {
    padding: 10px;
    overflow: hidden;
    .search-content {
        width: 100%;
        padding: 10px; 
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .block {
            margin-left: 30px; 
        }
        .label {
            color: rgba($color: #000000, $alpha: 0.5);
            margin-right: 10px;
        }
    }
    .home-btn {
        width: 100%;
        overflow: hidden;
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