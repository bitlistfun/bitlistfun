import { useWallet } from '@solana/wallet-adapter-react';
import { Button, Col, Layout, Row, Dropdown, message } from 'antd';
import { useWalletModal } from '@solana/wallet-adapter-react-ui'
import type { MenuProps } from 'antd';
import { motion } from "framer-motion"
import { encodeStr } from '../lib/common'
import { useCallback, useEffect } from 'react';
import { UseLocalStorage } from '../hooks/useIsomorphicLayoutEffect';
import base58 from 'bs58';
import { GetUserTokenHttp, LoginHttp } from '../api';


const { Header } = Layout;

const headerStyle: React.CSSProperties = {
    color: '#fff',
};


const HeaderNav = () => {
    const { connected, disconnect, publicKey, wallet, signMessage } = useWallet()
    const [isConnected, setIsConnected] = UseLocalStorage('APP_BITLIST_UID', '0');
    const [isToken, setIsToken] = UseLocalStorage('APP_BITLIST_TOKEN', '');
    const { visible, setVisible } = useWalletModal()

    const [messageApi, contextHolder] = message.useMessage();

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button onClick={() => { disconnect(); localStorage.clear(); window.location.reload() }}>Disconnect</Button>
            ),
        },

    ];

    useEffect(() => {
        console.log('isToken', isToken);
        console.log('visible', visible);
        if (connected && publicKey) {
            if (isConnected == '0') {
                // mutation.mutate()
                console.log('publicKey', publicKey.toBase58());
                Login()
            }
        }
    }, [publicKey, signMessage])
    // 登录
    const Login = useCallback(async () => {
        const res = await LoginHttp({
            address: publicKey?.toBase58() || ''
        });
        console.log('data===', res);
        if (res.result) {

            setIsConnected(res.result as string);
            handleSignMessage(res.result as string);
        }
    }, [publicKey]);
    const handleSignMessage = useCallback(async (msg: string) => {
        if (!publicKey || !signMessage) {
            console.error('Wallet not connected or signMessage not available');
            return;
        }
        const message = new TextEncoder().encode(msg);
        try {
            const signature = await signMessage(message);
            console.log('Signature:', signature);
            const signaData = base58.encode(signature);
            console.log('signaData:', signaData);

            // 这里可以将签名发送到服务器进行验证
            getUserToken(signaData, msg)
        } catch (error) {
            console.error('Signing failed', error);
        }
    }, [publicKey, signMessage]);
    // 获取token
    const getUserToken = async (signature: string, uid: string) => {
        const res = await GetUserTokenHttp({
            address: publicKey?.toBase58() || '',
            uid,
            signature
        });
        console.log('data===', res);
        if (res.result) {
            setIsToken(res.result as string);
            messageApi.success('Login success')
        }
    };

    return <Header style={headerStyle}>
        {contextHolder}
        <Row>
            <Col span={6}>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>
                    Bitlist App
                </span>
            </Col>
            <Col span={6}></Col>
            <Col span={6}></Col>
            <Col span={6} style={{ textAlign: 'right' }}>
                {connected ?
                    <Dropdown menu={{ items }} placement="bottom" arrow>
                        <motion.div
                            initial={false}
                            animate={{
                                width: connected ? 'auto' : 48,
                                height: 48,
                                transition: { duration: 0.3 }
                            }}
                        >

                            <Button type="primary" size="large" style={{ backgroundColor: '#5c20dd', color: '#fff' }} block>


                                <img
                                    src={wallet?.adapter.icon}
                                    alt={wallet?.adapter.name}
                                    width={24}
                                    height={24}
                                />
                                <span className="font-medium">
                                    {encodeStr(publicKey?.toBase58())}
                                </span>

                            </Button>
                        </motion.div>
                    </Dropdown> : <Button type="primary" size="large" onClick={() => setVisible(true)}>Connect</Button>}
            </Col>
        </Row>
    </Header>
}

export default HeaderNav
