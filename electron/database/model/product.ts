import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, Index, Default } from '@sequelize/core/decorators-legacy';

// @Table({ schema: 'public' })
export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare name: string;

  @Attribute(DataTypes.STRING)
  @Unique
  declare enName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare sku: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare unit: string;

  @Attribute(DataTypes.STRING)
  declare originCountry: string;

  @Attribute(DataTypes.STRING)
  declare factoryNumber: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(true)
  declare disabled: boolean;
}
