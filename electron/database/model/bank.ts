import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, CreatedAt, Index, Default } from '@sequelize/core/decorators-legacy';

// @Table({ schema: 'public' })
export class Bank extends Model<InferAttributes<Bank>, InferCreationAttributes<Bank>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  // @Index({ unique: true })
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  // @Index({ unique: true })
  declare account: string;

  @Attribute(DataTypes.STRING)
  declare address: string;

  @Attribute(DataTypes.STRING)
  @Unique
  declare swiftCode: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare disabled: boolean;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare currency: string | null;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare default: boolean;

  // @Attribute(DataTypes.INTEGER)
  // @Default(dayjs().valueOf())
  // declare deleteAt: number;

  // 默认配置
  // @CreatedAt
  // @Default(dayjs().valueOf())
  // declare createdAt: number;
  // declare createdTime: CreationOptional<Number>;
  // declare updatedAt: CreationOptional<Date>;
}
