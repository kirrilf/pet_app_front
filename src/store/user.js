import axios from 'axios'
import auth from "@/store/auth";


export default {
    state: {
    },
    mutations: {
    },
    getters:{
    },
    actions: {
        async getUser({dispatch, commit}, id){
            try{
                await auth.actions.checkRefreshToken({dispatch, commit})
                const res = await axios.get(`http://localhost:8081/api/users/${id}`, {
                    headers: {
                        "Authorization": "Bearer_" + localStorage.access_token
                    }
                })
                return res.data
            }catch (e){
                throw e
            }
        }
    },
}

