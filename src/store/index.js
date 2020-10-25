import { createStore } from 'vuex'
import posts from '@/store/posts'
import auth from "@/store/auth";

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts, auth
  }
})
