import axios from 'axios'
import auth from "@/store/auth"

async function refreshTokenCheck(status) {
    if (status === 403) {
        await this.$store.dispatch('refreshToken')
        return true
    }
    return false
}


export default {
    mutations: {
        getPostsMut(state, posts) {
            state.posts = posts
        },
        savePostMut(state, post) {
            state.posts = [
                ...state.posts,
                post
            ]
        },
        updatePostMut(state, post) {
            const index = state.posts.findIndex(item => item.id === post.id)
            state.posts = [
                ...state.posts.slice(0, index),
                ...state.posts.slice(index + 1)
            ]
            state.posts.unshift(post)
        },
        deletePostMut(state, id){
            const index = state.posts.findIndex(item => item.id === id)
            state.posts = [
                ...state.posts.slice(0, index),
                ...state.posts.slice(index + 1)
            ]
        },
        getOnePostMut(state, post){
            state.post = post
        }
    },
    state: {
        posts: [],
        post: ''
    },
    getters: {
        allPosts(state) {
            return state.posts.sort((a, b) => a.updateDate < b.updateDate ? 1 : -1)
        },
        allUserPosts(state){
            let size = 3;
            let posts = []
            state.posts = state.posts.sort((a, b) => a.updateDate < b.updateDate ? 1 : -1)
            for (let i = 0; i < Math.ceil(state.posts.length/size); i++){
                posts[i] = state.posts.slice((i*size), (i*size) + size)
            }
            return posts
        },
        getOnePost(state){
            return state.post
        },
    },
    actions: {
        async fetchPosts({dispatch, commit}) {
            try {
                await auth.actions.checkRefreshToken({dispatch, commit})
                const res = await axios.get("http://localhost:8081/api/posts", {
                    headers: {
                        "Authorization": "Bearer_" + localStorage.access_token
                    }
                })
                const posts = res.data
                commit('getPostsMut', posts)
            } catch (e) {
                throw e
            }
        },
        async savePost({dispatch, commit}, formData) {
            try {

                await auth.actions.checkRefreshToken({dispatch, commit})
                const res = await axios.post("http://localhost:8081/api/posts", formData, {
                    headers: {
                        "Authorization": "Bearer_" + localStorage.access_token,
                        "Content-Type": "multipart/form-data",
                    }
                })
                const post = res.data
                commit('savePostMut', post)

            } catch (e) {
                throw e
            }
        },
        async updatePost({dispatch, commit}, formData) {
            try {
                await auth.actions.checkRefreshToken({dispatch, commit});
                const res = await axios.put(`http://localhost:8081/api/posts/${formData.get("id")}`, formData, {
                    headers: {
                        "Authorization": "Bearer_" + localStorage.access_token,
                        "Content-Type": "multipart/form-data",
                    }
                })
                const post = res.data
                commit('updatePostMut', post)
            } catch (e) {
                throw e
            }
        },
        async deletePost({dispatch, commit}, id) {
            try {
                await auth.actions.checkRefreshToken({dispatch, commit});
                const res = await axios.delete(`http://localhost:8081/api/posts/${id}`,  {
                    headers: {
                        "Authorization": "Bearer_" + localStorage.access_token
                    }
                })
                commit('deletePostMut', id)
            } catch (e) {
                throw e
            }
        },
        async likePost({dispatch, commit}, id) {
            await auth.actions.checkRefreshToken({dispatch, commit});
            const res = await axios.get(`http://localhost:8081/api/posts/${id}/like`, {
                headers: {
                    "Authorization": "Bearer_" + localStorage.access_token
                }
            })
            const post = res.data
            commit('updatePostMut', post)
        },
        async getPost({dispatch, commit}, id){
            await auth.actions.checkRefreshToken({dispatch, commit});
            const res = await axios.get(`http://localhost:8081/api/posts/${id}`, {
                headers: {
                    "Authorization": "Bearer_" + localStorage.access_token
                }
            })
            const post = res.data
            commit('getOnePostMut', post)
        },
        async getAllUserPosts({dispatch, commit}, id){
            try {
                await auth.actions.checkRefreshToken({dispatch, commit})
                const res = await axios.get(`http://localhost:8081/api/posts/user/${id}`, {
                    headers: {
                        "Authorization": "Bearer_" + localStorage.access_token
                    }
                })
                const posts = res.data
                commit('getPostsMut', posts)
            } catch (e) {
                throw e
            }

        }
    }
}
