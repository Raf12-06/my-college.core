import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Identity} from "./identity.model";

export interface FioCreatAttrs {
    identity_id: number
}

@Table({ tableName: 'fio' })
export class Fio extends Model<Fio, FioCreatAttrs> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Identity)
    @Column({type: DataType.INTEGER})
    identity_id: number;

    @Column({ type: DataType.STRING, allowNull: true })
    first_name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    second_name: string;

    @Column({ type: DataType.STRING, allowNull: true })
    third_name: string;
}
