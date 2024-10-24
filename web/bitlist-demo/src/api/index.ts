import { CreateEntryArgs, GetBitwiseType, PayArgsType, RequestConfigType } from '../types/global'
import request from './config'


//登陆获取uid用于签名
export const LoginHttp = (params: RequestConfigType) => {
    return request({
        url: '/web3auth/getUserId',
        method: 'post',
        data: params
    })
}
//生成的钱包钱包传到服务器获取token
export const GetUserTokenHttp = (params: RequestConfigType) => {
    return request({
        url: '/web3auth/getUserToken',
        method: 'post',
        data: params
    })
}

//获取bitlist数据
export const GetBitlistHttp = (params: GetBitwiseType) => {
    return request({
        url: `/api/v2/tables/md4wydwajdi4kp1/records?limit=${params.limit}&offset=${params.offset}`,
        method: 'get',
    })
}

//创建bitlist

export const CreateBitlistHttp = (params: CreateEntryArgs) => {
    return request({
        url: '/api/v2/tables/md4wydwajdi4kp1/records',
        method: 'post',
        data: params
    })
}

//获取订单详情
export const GetCheckOrderIDHttp = (address: string) => {
    return request({
        url: `/api/v2/tables/mat6hdh64lyv1e9/records?where=(Id,eq,${address})`,
        method: 'get',
        headers: {

            'token': localStorage.getItem('APP_BITLIST_TOKEN') as string
        }
    })
}

//付款
export const PayHttp = (data: PayArgsType) => {
    return request({
        url: '/api/v2/tables/mat6hdh64lyv1e9/records',
        method: 'post',
        data
    })
}