import { FactureType } from "./facture-type";
import { User } from "./user";

export class Facture {
    id!: string;
    name!: string;
    month!: number;
    type!: string;
    user!: User;
    number?: string;
    recite?: string;
    created_at!: Date;
    updated_at?: Date;
}
