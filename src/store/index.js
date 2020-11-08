import { createStore } from 'vuex'
import posts from '@/store/posts'
import auth from "@/store/auth"
import user from "@/store/user"

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts, auth, user
  }
})
