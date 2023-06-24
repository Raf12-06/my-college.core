import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import {Identity} from "./identity.model";

@Table({ tableName: 'personal' })
export class Personal extends Model<Personal> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Identity)
    @Column({type: DataType.INTEGER})
    identity_id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    inn: string;

    @Column({ type: DataType.STRING, unique: true, allowNull: true })
    passport: string;
}
