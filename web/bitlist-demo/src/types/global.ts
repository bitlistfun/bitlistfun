import { PublicKey } from "@solana/web3.js";

export interface ListDataType {
    Id?: number;
    UpdatedAt: string
    baseAmount: number;
    chainName: string;
    costAmount: number;
    freeContent: string;
    paidContent: string;
    sender: string;
    title: string;
}

export interface OrderListType {
    Id: number;
    sender: string;
    CreatedAt: string;
    UpdatedAt: string;
    recipient: string;
    memo: string;
}


export interface RequestConfigType {
    address?: string;
    uid?: string;
    signature?: string;
}

export interface GetBitwiseType {
    limit?: number;
    offset?: number;
}

export interface CreateEntryArgs {
    title?: string;
    message?: string;
    data?: string;
    price?: string;
    members?: string;
    owner?: PublicKey;
    account?: PublicKey;
}
export interface PayArgsType {
    sender: string;
    recipient: string;
    memo: string;
}