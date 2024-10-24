import { Modal, Form, Input, message, Button, FormProps } from 'antd';

import { useWallet } from '@solana/wallet-adapter-react';
import { useState } from 'react';
import { CreateBitlistHttp } from '../api';
import { CreateEntryArgs } from '../types/global';
import { transferSOL } from '../hooks/solanaTransfer';

const BitlistCreate = ({ onFetchData }: { onFetchData: () => void }) => {

    const { publicKey } = useWallet();
    const [messageApi, contextHolder] = message.useMessage();


    const [open, setOpen] = useState(false);

    const [form] = Form.useForm()

    const wallet = useWallet();
    async function payToSeeId() {
        try {
            const signature = await transferSOL(wallet, 0.01);
            message.success(`转账成功,交易签名: ${signature}`);
            if (signature) {
                // window.location.reload()
                msgDestroy()
                setTimeout(() => {
                    messageApi.open({
                        type: 'success',
                        content: 'success release',
                    });
                }, 1000);
                onFetchData()
            }
        } catch (e: any) {
            msgDestroy()
            setTimeout(() => {
                messageApi.open({
                    type: 'warning',
                    content: e.message,
                });
            }, 1000)
        }
    }
    const onCreate: FormProps<CreateEntryArgs>['onFinish'] = async (values) => {
        console.log('Success:', values);
        messageApi.open({
            type: 'loading',
            content: 'release...',
            duration: 0,
        });
        try {
            const payload = {
                ...values,
                sender: publicKey?.toString()
            }
            console.log('payload---', payload)

            const resData = await CreateBitlistHttp(payload)
            console.log('resdata---', resData)
            if (resData?.Id) {
                setOpen(false);
                payToSeeId()

            }
        } catch (e: any) {
            msgDestroy()
            setTimeout(() => {
                messageApi.open({
                    type: 'warning',
                    content: e.message,
                });
            }, 1000)
        }

    };

    function msgDestroy() {
        messageApi.destroy()
    }

    if (!publicKey) {
        return <h3>Connect your wallet</h3>;
    }
    return (
        <>
            {contextHolder}
            <div className="text-center sm:px-6 lg:px-8">
                <Button type="primary" size="large" style={{ backgroundColor: '#5c20dd', color: '#fff' }} onClick={() => setOpen(true)}>
                    Create Bitlist
                </Button>


                <Modal
                    open={open}
                    title="Add Bitlist"
                    okText='submit'
                    okButtonProps={{ autoFocus: true, htmlType: 'submit', className: '!bg-black !text-white' }}
                    onCancel={() => setOpen(false)}
                    destroyOnClose
                    //   confirmLoading={createEntry.isPending}
                    modalRender={(dom) => (
                        <Form
                            layout="vertical"
                            form={form}
                            name="form_in_modal"
                            initialValues={{ modifier: 'public' }}
                            clearOnDestroy
                            onFinish={onCreate}
                        >
                            {dom}
                        </Form>
                    )}
                >

                    <Form.Item name="title" label="Title"
                        rules={[{ required: true, message: 'Please enter the product Title!' }]}
                    >
                        <Input placeholder='Please enter the product Ti!' />
                    </Form.Item>
                    <Form.Item name="baseAmount" label="BaseAmount"
                        rules={[{ required: true, message: 'Please enter the product baseAmount!' }]}
                    >
                        <Input placeholder='Please enter the product price!' type='number' />
                    </Form.Item>
                    <Form.Item name="costAmount" label="CostAmount"
                        rules={[{ required: true, message: 'Please enter the product CostAmount!' }]}
                    >
                        <Input placeholder='Please enter the product CostAmount!' type='number' />
                    </Form.Item>


                    <Form.Item name="chainName" label="ChainName"
                        rules={[{ required: true, message: 'Please enter the product ChainName!' }]}
                    >
                        <Input placeholder='Please enter the product ChainName!' />
                    </Form.Item>

                    <Form.Item name="freeContent" label="FreeContent"
                        rules={[{ required: true, message: 'Please enter the  freeContent!' }]}
                    >
                        <Input.TextArea placeholder='Please enter the  freeContent!' />
                    </Form.Item>
                    <Form.Item name="paidContent" label="PaidContent"
                        rules={[{ required: true, message: 'Please enter the  paidContent!' }]}
                    >
                        <Input.TextArea placeholder='Please enter the  paidContent!' />
                    </Form.Item>

                </Modal>
            </div>
        </>

    );
}

export default BitlistCreate