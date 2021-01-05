import axios from 'axios'
import auth from "@/store/auth";

export default {
    mutations:{
        getCommentsMut(state, comments){
                state.comments = comments
        },
        saveCommentMut(state, comment) {
            state.comments = [
                ...state.comments,
                comment
            ]
        },
    },
    state:{
        comments: []
    },
    getters:{
        getComments(state){
            return state.comments.sort((a, b) => a.updateDate < b.updateDate ? 1 : -1)
        }
    },
    actions: {
        async fetchComments({dispatch, commit}, id){
            try {
                await auth.actions.checkRefreshToken({dispatch, commit})
                const res = await axios.get("http://localhost:8081/api/comment/"+id, {
                    headers: {
                        "Authorization": "Bearer_" + localStorage.access_token
                    }
                })
                const comments = res.data
                commit('getCommentsMut', comments)
            } catch (e) {
                throw e
            }
        },
        async saveComment({dispatch, commit}, data) {
            try {

                await auth.actions.checkRefreshToken({dispatch, commit})
                const res = await axios.post("http://localhost:8081/api/comment/"+data.id,data.comment, {
                    headers: {
                        "Authorization": "Bearer_" + localStorage.access_token
                    }
                })
                const comment = res.data
                commit('saveCommentMut', comment)

            } catch (e) {
                throw e
            }
        },
    }
}