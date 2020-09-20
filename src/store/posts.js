import axios from 'axios'

export default {
    actions:{
        fetchPosts({dispatch, commit}){
            try {
                let messages
                let path = "http://localhost:8081/api/posts"
                let config = {
                    headers: {
                        "Authorization": "Bearer_"+localStorage.token
                    }
                }
                axios.get(path, config).then(response=>{
                    messages = response.data
                })
                return messages
            }catch (e){
                throw e
            }
        }
    }
}
