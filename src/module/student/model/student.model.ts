import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    Index,
    IsDate,
    Length,
    Model,
    Table
} from "sequelize-typescript";
import {Group} from "../../group/model/group.model";

@Table({ tableName: 'student' })
export class Student extends Model<Student> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Length({ min: 5, max: 50, msg: 'Некорректный номер приказа' })
    @Column({ type: DataType.STRING, allowNull: false })
    order_num: string;

    @IsDate
    @Column({ type: DataType.DATEONLY, allowNull: false })
    order_date: string;

    @ForeignKey(() => Group)
    @Index
    @Column
    group_id: number;

    @BelongsTo(() => Group)
    group: Group;

    @Column({ type: DataType.STRING, allowNull: false })
    secure_key: string;
}
