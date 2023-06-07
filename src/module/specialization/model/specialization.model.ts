import {Column, DataType, HasMany, Is, IsInt, Length, Max, Min, Model, Table} from "sequelize-typescript";
import {Group} from "../../group/model/group.model";
import {InternalServerErrorException} from "@nestjs/common";

@Table({ tableName: 'specialization' })
export class Specialization extends Model<Specialization> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Is('Проверка номера специальности',value => {
        if (!/^[0-9]{2}\.[0-9]{2}\.[0-9]{2}$/.test(value)) {
            throw new InternalServerErrorException('Неккоректный номер специальности')
        }
    })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    num: string;

    @Length({ min: 10, max: 255 })
    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    name: string;

    @IsInt
    @Min(3)
    @Max(4)
    @Column({ type: DataType.INTEGER, allowNull: false })
    period_year: number;

    @IsInt
    @Min(1)
    @Max(11)
    @Column({ type: DataType.INTEGER, allowNull: false })
    period_month: number;

    @Is('Проверка флага финансирования',value => {
        if (typeof value !== 'boolean') {
            throw new InternalServerErrorException('Неккоректное значение финансирования специальности')
        }
    })
    @Column({ type: DataType.BOOLEAN, allowNull: false })
    budget: boolean;

    @IsInt
    @Min(1)
    @Max(999)
    @Column({ type: DataType.INTEGER, allowNull: true })
    num_place: number;

    @Is('Проверка флага активности',value => {
        if (typeof value !== 'boolean') {
            throw new InternalServerErrorException('Неккоректный флаг активности специальности')
        }
    })
    @Column({ type: DataType.BOOLEAN, defaultValue: false })
    is_active: boolean;

    @HasMany(() => Group)
    groups: Group[];
}
