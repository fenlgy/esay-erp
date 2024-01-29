import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, Index, Default } from '@sequelize/core/decorators-legacy';

@Table({ timestamps: false })
export class SerialNumber extends Model<InferAttributes<SerialNumber>, InferCreationAttributes<SerialNumber>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare module: string;

  @Attribute(DataTypes.STRING)
  declare prefix: string;

  @Attribute(DataTypes.STRING)
  declare date: string;

  @Attribute(DataTypes.INTEGER)
  declare counter: number;
}
