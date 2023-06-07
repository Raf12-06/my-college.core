import {BelongsToMany, Column, DataType, IsUppercase, Length, Model, Table} from "sequelize-typescript";
import {User} from "../../user/model/user.model";
import {UserRole} from "./user-role.model";

@Table({ tableName: 'roles' })
export class Role extends Model<Role> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @IsUppercase
    @Length({ min: 4, max: 20, msg: 'Некорректная длинна названия роли' })
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    values: string;

    @Length({ min: 10, max: 255, msg: 'Некорректная длинна описания роли' })
    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}
