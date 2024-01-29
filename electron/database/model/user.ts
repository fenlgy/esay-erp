import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, Index, Default } from '@sequelize/core/decorators-legacy';

// @Table({ schema: 'public' })
export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  // @Unique
  // @Index({ unique: true })
  declare firstName: string;

  @Attribute(DataTypes.STRING)
  declare lastName: string | null;

  // @Attribute(DataTypes.INTEGER)
  // @Default(dayjs().valueOf())
  // declare deleteAt: number;

  // 默认配置
  // @CreatedAt
  // @Default(dayjs().valueOf())
  // declare createdAt: number;
  // declare createdTime: CreationOptional<Number>;
  // declare updatedAt: CreationOptional<Date>;
  getFullName() {
    return [this.firstName, this.lastName].join(' ');
  }
}
