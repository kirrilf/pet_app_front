import axios from 'axios'
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import user from "@/store/user"

export default {
    state: {

    },
    mutations: {

    },
    getters:{

    },
    actions: {
        async login({dispatch, commit}, {username, password}) {
            try {
                let path = "http://localhost:8081/api/auth/login"

                const fp = await FingerprintJS.load()

                const result = await fp.get()

                const visitorId = result.visitorId

                let config = {
                    headers: {
                        "Fingerprint": visitorId
                    }
                }



                await axios.post(path, {username, password}, config).then(response => {
                    localStorage.setItem("access_token", response.data.access_token)
                    localStorage.setItem("refresh_token", response.data.refresh_token)
                    localStorage.setItem("authId", response.data.id)
                })


            } catch (e) {
                throw e
            }
        },
        async register({dispatch, commit}, {username, firstName, lastName, email, password}) {
            try {
                let path = 'http://localhost:8081/api/registration'
                return axios.post(path, {username, firstName, lastName, email, password}).then(response => {
                    return response.data
                })
            } catch (e) {
                throw e
            }
        },
        async checkRefreshToken({dispatch, commit}) {
            try {


                let access = localStorage.access_token.substring(21)
                let paramsToken = JSON.parse(window.atob(access.substring(0, access.indexOf("."))))

                if(paramsToken.exp < new Date().getTime()/1000) {
                    let path = 'http://localhost:8081/api/auth/refresh'

                    const fp = await FingerprintJS.load()

                    const result = await fp.get()
                    const visitorId = result.visitorId

                    let config = {
                        headers: {
                            "Authorization": "Bearer_" + localStorage.refresh_token,
                            "Fingerprint": visitorId
                        }
                    }
                    await axios.get(path, config).then(response => {
                        localStorage.refresh_token = response.data.refresh_token
                        localStorage.access_token = response.data.access_token
                    })
                }

            } catch (e) {
                throw e
            }
        },
    }

}
