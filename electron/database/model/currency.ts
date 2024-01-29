import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, CreatedAt, Index, Default } from '@sequelize/core/decorators-legacy';

// @Table({ schema: 'public' })
export class Currency extends Model<InferAttributes<Currency>, InferCreationAttributes<Currency>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  // get name(): string {
  //   return this.getDataValue('name').toUpperCase();
  // }
  // set name(value: string) {
  //   this.setDataValue('name', value.toUpperCase());
  // }
  // @Index({ unique: true })
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare enName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare symbol: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare code: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare disabled: boolean;

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

// Warehouse.init({
//   defaultScope: { order: ['createdAt': 'DESC'] },Sequelize,modelName:'warehouse'
// });
