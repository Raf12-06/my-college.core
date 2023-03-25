import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {Role} from "../../role/model/role.model";
import {UserRole} from "../../role/model/user-role.model";

export interface UserCreatAttrs {
    username: string;
    password: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreatAttrs> {

    @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
    id: number;

    @Column({ type: DataType.STRING, unique: true, allowNull: false })
    username: string;

    @Column({ type: DataType.STRING, allowNull: false })
    password: string;

    @BelongsToMany(() => Role, () => UserRole)
    roles: Role[]
}
