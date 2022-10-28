import { Facture } from './facture';

export class Transaction {
    id!: string;
    name!: string;
    description?: string;
    price!: number;
    facture!: Facture;
    quantity!: number;
    number!: number;
    delivery?: string;
    payment?: boolean;
    created_at!: string;
    updated_at?: string;
}
