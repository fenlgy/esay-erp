import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, Index, Default } from '@sequelize/core/decorators-legacy';

@Table({ noPrimaryKey: true })
export class SystemConfig extends Model<InferAttributes<SystemConfig>, InferCreationAttributes<SystemConfig>> {
  declare id: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare type: 'system' | 'pagenation';

  @Attribute(DataTypes.JSON)
  @NotNull
  declare value: Object;
}
