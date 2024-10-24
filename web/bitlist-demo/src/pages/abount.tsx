import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GetCheckOrderIDHttp } from "../api";
import { Card, Flex, Button } from 'antd';

import { OrderListType } from "../types/global";

import { DescriptionComponent } from "../components";

const About = () => {
    const { state } = useLocation();
    console.log("location--", state);
    const [orderData, setOrderData] = useState<OrderListType>({
        Id: 0,
        sender: '',
        CreatedAt: '',
        UpdatedAt: '',
        recipient: '',
        memo: ''
    })

    const fetchOrderId = async () => {
        try {
            const result = await GetCheckOrderIDHttp(state.Id)
            console.log("result--", result);
            // 确保 result 是一个数组
            if (Array.isArray(result?.list) && result?.list.length > 0) {
                const orderList = result?.list.find((item: OrderListType) => Number(item?.memo) == state.Id)
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
            <Button type="primary" color='primary' variant='filled' onClick={() => window.history.back()}>Back</Button>

        </Flex>
        }
            actions={[
                <div className=''>
                    <div className="sharethis-inline-share-buttons"></div>
                </div>
            ]}
        >
            <DescriptionComponent itemdata={state} orderId={orderData?.memo ? orderData?.memo : ''} />
        </Card>
    </div>

}

export default About

