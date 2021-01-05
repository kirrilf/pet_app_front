import { createStore } from 'vuex'
import posts from '@/store/posts'
import auth from "@/store/auth"
import user from "@/store/user"
import comment from "@/store/comment"

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    posts, auth, user, comment
  }
})
