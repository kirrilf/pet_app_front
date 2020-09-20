import axios from 'axios'

export default {
    actions:{
        login({dispatch, commit}, {username, password}){
            try {
                let path = "http://localhost:8081/api/auth/login"
                axios.post(path, {username, password}).then(response =>{
                    localStorage.setItem("token", response.data.token)
                })
            }catch (e){
                throw e
            }
        }
    }
}
