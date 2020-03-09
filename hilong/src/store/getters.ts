import { RootStateTypes } from './interface'
import { GetterTree } from 'vuex'

const getters: GetterTree<RootStateTypes, any> = {
    getUser:(state: RootStateTypes) => {
        return state.user;
    },
    getList:(state: RootStateTypes) => {
        return state.list;
    },
    getDetail:(state: RootStateTypes) => {
        return state.detail;
    }
}

export default getters