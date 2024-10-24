import { Connection, PublicKey, Transaction, SystemProgram } from "@solana/web3.js";
import { WalletContextState } from "@solana/wallet-adapter-react";

export async function transferSOL(
    wallet: WalletContextState,
    amount: number
) {
    const VITE_APP_ID = import.meta.env.VITE_APP_ID
    try {
        if (!wallet.publicKey || !wallet.signTransaction) {
            throw new Error("钱包未连接");
        }

        const connection = new Connection("https://api.devnet.solana.com");
        const recipientPubKey = new PublicKey(VITE_APP_ID);

        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: wallet.publicKey,
                toPubkey: recipientPubKey,
                lamports: amount * 1000000000 // 将SOL转换为lamports
            })
        );

        // 设置最近的区块哈希
        const latestBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = latestBlockhash.blockhash;
        transaction.feePayer = wallet.publicKey;

        // 使用钱包签名交易
        const signedTransaction = await wallet.signTransaction(transaction);

        // 发送已签名的交易
        const signature = await connection.sendRawTransaction(signedTransaction.serialize());

        // 等待交易确认
        await connection.confirmTransaction(signature);

        console.log("转账成功,交易签名:", signature);
        return signature;
    } catch (error) {
        console.error("转账失败:", error);
        throw error;
    }
}
