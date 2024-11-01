import { AxiosResponse } from 'axios'
import Request from './request/index'

import type { RequestConfig } from './request/types'

export interface YWZResponse<T> {
    statusCode: number
    desc: string
    result: T
}

// 重写返回类型
interface YWZRequestConfig<T, R> extends RequestConfig<YWZResponse<R>> {
    data?: T
}
const API_TOKEN = import.meta.env.VITE_API_TOKEN
const API_URL = import.meta.env.VITE_API_URL
// console.log('API_URL----', API_URL)
// 打包时记得切换
const request = new Request({
    baseURL: '/api',
    // baseURL: 'http://localhost:5173/api',
    // baseURL: API_URL,
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            return config
        },
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            return result
        },
    },
    headers: {
        'xc-token': API_TOKEN,
        'Content-Type': 'application/json',
    },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {YWZRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const ywzRequest = <D, T>(config: YWZRequestConfig<D, T>) => {
    const { method = 'GET' } = config
    if (method === 'get' || method === 'GET') {
        config.params = config.data
    }
    return request.request<YWZResponse<T>>(config)
}
// // 取消请求
// export const cancelRequest = (url: string | string[]) => {
//   return request.cancelRequest(url)
// }
// // 取消全部请求
// export const cancelAllRequest = () => {
//   return request.cancelAllRequest()
// }

export default ywzRequest