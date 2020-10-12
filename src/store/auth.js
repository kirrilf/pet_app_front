import axios from 'axios'

export default {
    actions:{
        async login({dispatch, commit}, {username, password}){
            try {
                let path = "http://localhost:8081/api/auth/login"
                return await axios.post(path, {username, password}).then(response =>{
                    localStorage.setItem("token", response.data.token)
                    return response.data
                })
            }catch (e){
                throw e
            }
        },
        async register({dispatch, commit}, {username, firstName, lastName, email, password}){
            try {
                let path = 'http://localhost:8081/api/registration'
                let respon
                axios.post(path, {username, firstName, lastName, email, password}).then(response =>{
                    respon=  response.data
                })
                return respon
            }catch (e){
                throw e
            }
        }
    }
}
