import { config } from '@vue/test-utils'
import axios from 'axios'
import qs from 'qs'
import {getToken} from '@/utils/myAuth'
const serve = axios.create({
    timeout: 5000
})

//requset & response interception
serve.interceptors.request.use(
    config => {
        let token = getToken()
        if (token != '' && token != 'undefined') {
            config.headers['bufan-token'] = token
        }
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)
serve.interceptors.response.use()

//get & post combine

function http(config) {
    if (config.method.toLowerCase() == 'post') {
        config.data = qs.stringify(config.data,{arrayFormat: 'repeat',allowDots: true})
    } else {
        config.params = config.data
    }
    return serve(config)
}

export default http
