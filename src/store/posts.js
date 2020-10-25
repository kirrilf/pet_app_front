import axios from 'axios'
import auth from "@/store/auth";
import FingerprintJS from '@fingerprintjs/fingerprintjs';

async function refreshTokenCheck(status) {
    if (status === 403) {
        await this.$store.dispatch('refreshToken')
        return true
    }
    return false
}


export default {
    actions:{
        async fetchPosts({dispatch, commit}){
            try {

                //debugger

                await auth.actions.checkRefreshToken({dispatch, commit});

                //debugger

                let messages
                let status
                let path = "http://localhost:8081/api/posts"
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.access_token
                    }
                }

                await axios.get(path, config).then(response=>{
                    status = response.status
                    messages = response.data

                })

                return messages
            }catch (e){
                throw e
            }
        },
        async savePost({dispatch, commit}, post){
            try {

                await auth.actions.checkRefreshToken({dispatch, commit});

                let message
                let path = "http://localhost:8081/api/posts"
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.access_token
                    }
                }
                await axios.post(path, post, config).then(response=>{
                    message =  response.data
                })
                return message
            }catch (e){
                throw e
            }
        },
        async updatePost({dispatch, commit}, post){
            try {
                await auth.actions.checkRefreshToken({dispatch, commit});
                let message
                let path = "http://localhost:8081/api/posts/"+post.id
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.access_token
                    }
                }
                await axios.put(path, post, config).then(response=>{
                    message =  response.data
                })
                return message
            }catch (e){
                throw e
            }
        },
        async deletePost({dispatch, commit}, id){
            try {
                await auth.actions.checkRefreshToken({dispatch, commit});
                let message
                let path = "http://localhost:8081/api/posts/" + id
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.access_token
                    }
                }
                await axios.delete(path, config).then(response=>{
                    message = response.status
                })
                return message;
            }catch (e){
                throw e
            }
        }
    }
}
