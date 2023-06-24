import {Column, DataType, ForeignKey, Index, Length, Model, Table} from "sequelize-typescript";
import {Identity} from "./identity.model";

export enum ContactTypeI {
    telegram = 'telegram',
    vk = 'vk',
    ok = 'ok',
    instagram = 'instagram',
    phone = 'phone',
    main_phone = 'main_phone',
    email = 'email',
    whatsapp = 'whatsapp',
    viber = 'viber',
    other = 'other',
}

@Table({ tableName: 'contact' })
export class Contact extends Model<Contact> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @ForeignKey(() => Identity)
    @Column({ type: DataType.INTEGER, allowNull: false })
    identity_id: number;

    @Column({ type: DataType.ENUM(...Object.values(ContactTypeI)), allowNull: false })
    contact_type: ContactTypeI;

    @Column({ type: DataType.STRING, allowNull: false })
    contact_value: string;

    @Length({ max: 255 })
    @Column({ type: DataType.STRING, allowNull: true })
    contact_description: string;
}
