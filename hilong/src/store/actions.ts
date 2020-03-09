import { RootStateTypes } from './interface'
import { ActionTree } from 'vuex'
import * as types from './types';
import axios from 'axios';
const actions: ActionTree<RootStateTypes, any> = {
    //  查找用户
    async [types.GET_USER]({ commit, state: RootStateTypes}, params: object) {
        const res = await axios.post('findUser',params);
        commit('SET_USER',res.data);
        return res.data
    },
    // 创建用户
    async [types.CREATE_USER]({ commit, state: RootStateTypes}, params: object) {
        const res = await axios.post('createUser',params);
        return res.data
    },
    // 查询列表
    async [types.GET_LIST]({ commit, state: RootStateTypes}, params: object) {
        const res = await axios.get('searchList',{params:params});
        commit('SET_LIST',res.data);
        return res.data
    },
    // 添加列表
    async [types.ADD_LIST]({ commit, state: RootStateTypes}, params: object) {
        const res = await axios.get('addList',{params:params});
        return res.data
    },
    // 获取详情
    async [types.GET_DETAIL]({ commit, state: RootStateTypes}, params: object) {
        const res = await axios.get('detail',{params:params});
         commit('SET_DETAIL',res.data);
        return res.data
    },
    // 更新列表
    async [types.UPDATE_LIST]({ commit, state: RootStateTypes}, params: object) {
        const res = await axios.post('updateList',params);
        return res.data
    },
    // 删除列表
    async [types.DELETE_LIST]({ commit, state: RootStateTypes}, params: object) {
        const res = await axios.get('deleteList',{params:params});
        return res.data
    },
}

export default actions