import { RootStateTypes } from './interface'
import { MutationTree  } from 'vuex'
import * as types from './types';

const mutations: MutationTree<RootStateTypes> = {
  [types.SET_USER](state: RootStateTypes, pyload: string|any) {
    state.user = pyload
  },
  [types.SET_LIST](state: RootStateTypes, pyload: string|any) {
    state.list = pyload
  },
  [types.SET_DETAIL](state: RootStateTypes, pyload: string|any) {
    state.detail = pyload
  }
}

export default mutations