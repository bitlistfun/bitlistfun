import { Descriptions, Flex, Button, message, DescriptionsProps } from 'antd';
import { useWallet } from "@solana/wallet-adapter-react";
import { transferSOL } from "../hooks/solanaTransfer";
import { ListDataType } from '../types/global';
import { PayHttp } from '../api';
import { useState } from 'react';
// 描述组件（提取为单独的组件）
const DescriptionComponent = ({ itemdata, orderId, onFetchData }: { itemdata: ListDataType, orderId: string, onFetchData: () => void }) => {
    const VITE_APP_ID = import.meta.env.VITE_APP_ID

    const { Id, UpdatedAt, baseAmount, chainName, costAmount, freeContent, paidContent, sender, title } = itemdata;
    const [loading, setLoading] = useState(false)
    const walet = useWallet();
    async function payToSeeId() {
        setLoading(true)
        try {
            const signature = await transferSOL(walet, 0.01);
            if (signature) {
                message.success(`transfer success, transaction signature: ${signature}`);
                payToSeeUser()
            }
        } catch (error) {
            console.log("error--", error);
            message.error(`transfer failed, error: ${error}`);
        } finally {
            setLoading(false)
        }

    }

    const payToSeeUser = async () => {
        try {
            const result = await PayHttp({
                sender: walet.publicKey?.toString() || '',
                recipient: VITE_APP_ID,
                memo: Id?.toString() || ''
            })
            console.log("result--", result);
            if (result?.Id) {
                window.location.reload()
                // onFetchData()
            }
        } catch (e) {
            console.log("e--", e);
        } finally {
            setLoading(false)
        }
    }
    const items: DescriptionsProps['items'] = [
        {
            key: '1',
            label: 'Id',
            children: <p>{Id}</p>,
        },
        {
            key: '2',
            label: 'title',
            children: <p>{title}</p>,
        },
        {
            key: '3',
            label: 'costAmount',
            children: <p>{'$' + costAmount}</p>,
        },
        {
            key: '4',
            label: 'UpdatedAt',
            children: <p>{UpdatedAt}</p>,
        },
        {
            key: '5',
            label: 'baseAmount',
            children: <p>{'$' + baseAmount}</p>,
        },
        {
            key: '6',
            label: 'chainName',
            children: <p>{chainName}</p>,
        },
        {
            key: '7',
            label: 'sender',
            children: <p>{sender}</p>
        },
        {
            key: '8',
            label: 'freeContent',
            children: <p>{freeContent}</p>,
        },

        {
            key: '9',
            label: 'paidContent',
            children:
                <Flex>
                    {Number(orderId) == Number(Id) ? <p>{paidContent}</p> : <Button loading={loading} onClick={payToSeeId}>need pay to see it</Button>}
                </Flex>
        },


    ];
    return <Descriptions
        title="bitlist detail"
        bordered
        column={2}
        size='small'
        items={items}
    />
}

export default DescriptionComponent