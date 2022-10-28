import { User } from "./user";

export class Facture {
    id!: string;
    name!: string;
    user!: User;
    number?: string;
    recite?: string;
    created_at!: Date;
    updated_at?: Date;
}
