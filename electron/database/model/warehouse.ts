import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, CreatedAt, Index, Default } from '@sequelize/core/decorators-legacy';
import dayjs from 'dayjs';

// @Table({ schema: 'public' })
export class Warehouse extends Model<InferAttributes<Warehouse>, InferCreationAttributes<Warehouse>> {
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
  set name(value: string) {
    this.setDataValue('name', value.toUpperCase());
  }
  // @Index({ unique: true })
  // declare name: string;

  @Attribute(DataTypes.STRING)
  declare enName: string;

  @Attribute(DataTypes.STRING)
  declare province: string;

  @Attribute(DataTypes.STRING)
  declare city: string;

  @Attribute(DataTypes.STRING)
  declare zone: string;

  @Attribute(DataTypes.STRING)
  declare address: string;

  @Attribute(DataTypes.STRING)
  declare remark: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare disabled: boolean;
}
