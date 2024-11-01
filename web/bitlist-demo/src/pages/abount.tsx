import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GetCheckOrderIDHttp } from "../api";
import { Card, Flex, Button } from 'antd';

import { OrderListType } from "../types/global";

import { DescriptionComponent } from "../components";
import { useWallet } from "@solana/wallet-adapter-react";

const About = () => {
    const { state } = useLocation(),
        { publicKey } = useWallet(),
        navigate = useNavigate(),
        [orderData, setOrderData] = useState<OrderListType>({
            Id: 0,
            sender: '',
            CreatedAt: '',
            UpdatedAt: '',
            recipient: '',
            memo: ''
        }),
        fetchOrderId = async () => {
            try {
                const result = await GetCheckOrderIDHttp(state.Id)
                console.log("result--", result);
                // 确保 result 是一个数组
                if (Array.isArray(result?.list) && result?.list.length > 0) {
                    const orderList = result?.list.find((item: OrderListType) => item?.sender == publicKey?.toBase58())
                    console.log("orderList--", orderList);
                    setOrderData(orderList)
                }
            } catch (e) {
                console.log("e--", e);
            }
        }
    useEffect(() => {
        fetchOrderId()
    }, [state])



    return <div style={{ height: '300px', margin: '100px' }}>
        <Card size='small' title={<Flex justify='space-between' align='center' >
            <Button type="primary" color='primary' variant='filled' onClick={() => navigate(-1)}>Back</Button>
            <Button type="primary" color='primary' variant='filled' onClick={fetchOrderId}>Refresh</Button>
        </Flex>
        }
            actions={[
                <div className=''>
                    <div className="sharethis-inline-share-buttons"></div>
                </div>
            ]}
        >
            <DescriptionComponent itemdata={state} orderId={orderData?.sender ? orderData?.sender : ''} onFetchData={fetchOrderId} />
        </Card>
    </div>

}

export default About

