import { BelongsToMany, Column, DataType, Model, Table } from "sequelize-typescript";
import {User} from "../../user/model/user.model";
import {UserRole} from "./user-role.model";

interface RoleCreatingAttrs {
    value: string;
    description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreatingAttrs> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    values: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @BelongsToMany(() => User, () => UserRole)
    users: User[]
}
