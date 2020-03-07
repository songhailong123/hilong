import { RootStateTypes } from './interface'
import { ActionTree } from 'vuex'
import * as types from './types';
import axios from 'axios';
const actions: ActionTree<RootStateTypes, any> = {
    async [types.GET_USER]({ commit, state: RootStateTypes}, params: string) {
        const res = await await axios.post('findUser',params);
        commit('SET_USER',res.data);
        return res.data
    }
}

export default action