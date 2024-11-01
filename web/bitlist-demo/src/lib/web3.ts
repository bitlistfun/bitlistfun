import { Wallet } from "@solana/wallet-adapter-react"
import { WalletReadyState } from '@solana/wallet-adapter-base'

export function SplitWallets(wallets: Wallet[]): { recommendedWallets: Wallet[]; notInstalledWallets: Wallet[] } {
    const supportedWallets = wallets.filter((w) => w.readyState !== WalletReadyState.Unsupported)
    const recommendedWallets = supportedWallets.filter((w) => w.readyState !== WalletReadyState.NotDetected && w.adapter.name !== 'Sollet')
    const notInstalledWallets = supportedWallets.filter((w) => w.readyState == WalletReadyState.NotDetected && w.adapter.name !== 'Phantom')
    const solletWallet = supportedWallets.find((w) => w.adapter.name === 'Sollet')
    solletWallet && notInstalledWallets.push(solletWallet)
    const phantomWallet = supportedWallets.find((w) => w.adapter.name === 'Phantom')
    phantomWallet && phantomWallet.readyState == WalletReadyState.NotDetected && recommendedWallets.unshift(phantomWallet)
    return { recommendedWallets, notInstalledWallets }
}