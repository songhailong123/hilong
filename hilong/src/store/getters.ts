import { RootStateTypes } from './interface'
import { GetterTree } from 'vuex'

const getters: GetterTree<RootStateTypes, any> = {
    getUser:(state: RootStateTypes) => {
        return state.userName
    }
}

export default getters