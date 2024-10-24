import { Descriptions, Flex, Button, message, DescriptionsProps } from 'antd';
import { useWallet } from "@solana/wallet-adapter-react";
import { transferSOL } from "../hooks/solanaTransfer";
import { ListDataType } from '../types/global';
import { PayHttp } from '../api';
// 描述组件（提取为单独的组件）
const DescriptionComponent = ({ itemdata, orderId }: { itemdata: ListDataType, orderId: string }) => {
    const VITE_APP_ID = import.meta.env.VITE_APP_ID

    const { Id, UpdatedAt, baseAmount, chainName, costAmount, freeContent, paidContent, sender, title } = itemdata;
    const walet = useWallet();
    async function payToSeeId() {
        const signature = await transferSOL(walet, 0.01);
        message.success(`转账成功,交易签名: ${signature}`);
        if (signature) {
            window.location.reload()
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
                    {Number(orderId) == Number(Id) ? <p>{paidContent}</p> : <Button onClick={
                        async () => {
                            try {
                                const result = await PayHttp({
                                    sender: walet.publicKey?.toString() || '',
                                    recipient: VITE_APP_ID,
                                    memo: Id?.toString() || ''
                                })
                                console.log("result--", result);
                                if (result?.Id) {
                                    payToSeeId()
                                }
                            } catch (e) {
                                console.log("e--", e);
                            }
                        }

                    }>need pay to see it</Button>}
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