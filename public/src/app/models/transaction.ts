import { Facture } from './facture';

export class Transaction {
    id!: string;
    name!: string;
    truckNumber?: string;
    conducteur?: string;
    date?: string;
    destination?: string;
    price!: number;
    facture!: Facture;
    quantity!: number;
    prixUnitaire!: number;
    nature!: string;
    payment?: string;
    created_at!: string;
    updated_at?: string;
}
