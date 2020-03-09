import { RootStateTypes } from './interface'
import { ActionTree } from 'vuex'
import * as types from './types';
import axios from 'axios';
const actions: ActionTree<RootStateTypes, any> = {
    //  查找用户
    async [types.GET_USER]({ commit, state: RootStateTypes}, params: string) {
        const res = await axios.post('findUser',params);
        commit('SET_USER',res.data);
        return res.data
    },
    // 创建用户
    async [types.CREATE_USER]({ commit, state: RootStateTypes}, params: string) {
        const res = await axios.post('createUser',params);
        return res.data
    },
    // 查询列表
    async [types.GET_LIST]({ commit, state: RootStateTypes}, params: object) {
        const res = await axios.get('searchList',{params:params});
        commit('SET_LIST',res.data);
        return res.data
    }
}

export default actions