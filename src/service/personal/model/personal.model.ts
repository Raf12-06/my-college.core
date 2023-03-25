import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import {Identity} from "./identity.model";

export interface PersonalCreatAttrs {
    identity_id: number;
}

@Table({ tableName: 'personal' })
export class Personal extends Model<Personal, PersonalCreatAttrs> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Identity)
    @Column({type: DataType.INTEGER})
    identity_id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    email: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    phone: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    inn: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    passport: string;
}
