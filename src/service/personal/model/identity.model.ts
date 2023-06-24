import {Column, DataType, HasMany, HasOne, Model, Table} from "sequelize-typescript";
import {Personal} from "./personal.model";
import {Fio} from "./fio.model";
import {Contact} from "./contact.model";

export interface IdentityCreateAttrs {
    user_secure: string;
}

@Table({ tableName: 'identity' })
export class Identity extends Model<Identity, IdentityCreateAttrs> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    user_secure: string;

    @HasOne(() => Personal)
    personal: Personal;

    @HasOne(() => Fio)
    fio: Fio;

    @HasMany(() => Contact)
    contact: Contact[];
}
