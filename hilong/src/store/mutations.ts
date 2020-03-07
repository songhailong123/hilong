import { RootStateTypes } from './interface'
import { MutationTree  } from 'vuex'
import * as types from './types';

const mutations: MutationTree<RootStateTypes> = {
  [types.SET_USER](state: RootStateTypes, pyload: string|null) {
    state.userName = pyload;
  }
}

export default mutations