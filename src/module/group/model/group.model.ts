import {BelongsTo, Column, DataType, ForeignKey, HasMany, Index, Is, Model, Table} from "sequelize-typescript";
import {Specialization} from "../../specialization/model/specialization.model";
import { InternalServerErrorException } from "@nestjs/common";
import {Student} from "../../student/model/student.model";

@Table({ tableName: 'group' })
export class Group extends Model<Group> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Is('Проверка названия группы',value => {
        if (!/^[A-Ю]{2}$/.test(value)) {
            throw new InternalServerErrorException('Неккоректное название группы')
        }
    })
    @Column({ type: DataType.STRING, allowNull: false, unique: 'group-name-unique' })
    group_name: string;

    @Is('Проверка года группы',value => {
        if (!/^[0-9]{2}$/.test(value)) {
            throw new InternalServerErrorException('Неккоректное год группы')
        }
    })
    @Column({ type: DataType.INTEGER, allowNull: false, unique: 'group-name-unique' })
    group_year: number;

    @Is('Проверка номера группы',value => {
        if (!/^[0-9]{2}$/.test(value)) {
            throw new InternalServerErrorException('Неккоректное номер группы')
        }
    })
    @Column({ type: DataType.INTEGER, allowNull: false, unique: 'group-name-unique' })
    group_num: number;

    @Is('Проверка постфиса группы',value => {
        if (!/^[а-ю]{2}$/.test(value)) {
            throw new InternalServerErrorException('Неккоректный постфикс группы')
        }
    })
    @Column({ type: DataType.STRING, allowNull: true, unique: 'group-name-unique' })
    group_postfix: string;

    @ForeignKey(() => Specialization)
    @Index
    @Column
    specialization_id: number;

    @BelongsTo(() => Specialization)
    specialization: Specialization;

    @HasMany(() => Student)
    students: Student[];
}
