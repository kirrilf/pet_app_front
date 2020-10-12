import axios from 'axios'

export default {
    actions:{
        async fetchPosts({dispatch, commit}){
            try {

                let messages
                let path = "http://localhost:8081/api/posts"
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.token
                    }
                }
                await axios.get(path, config).then(response=>{
                    messages =  response.data
                })
                return messages
            }catch (e){
                throw e
            }
        },
        async savePost({dispatch, commit}, post){
            try {
                let message
                let path = "http://localhost:8081/api/posts"
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.token
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
                let message
                let path = "http://localhost:8081/api/posts/"+post.id
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.token
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
                let message
                let path = "http://localhost:8081/api/posts/" + id
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.token
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
