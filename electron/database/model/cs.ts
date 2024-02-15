import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Unique, Default } from '@sequelize/core/decorators-legacy';

// @Table({ schema: 'public' })
export class Cs extends Model<InferAttributes<Cs>, InferCreationAttributes<Cs>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  @Unique
  declare name: string;

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare type: CSType; // 0 全部 / 1 客户 / 2 供应商

  @Attribute(DataTypes.INTEGER)
  @NotNull
  declare nature: CSNature; // 1 企业 / 2 个人

  @Attribute(DataTypes.STRING)
  @Unique
  declare code: string;

  // @Attribute(DataTypes.STRING)
  // @Unique
  // declare uniqueId: string;

  @Attribute(DataTypes.STRING)
  declare remark: string;

  @Attribute(DataTypes.BOOLEAN)
  @Default(false)
  declare disabled: boolean;
}

export type CSType = 0 | 1 | 2; // 0 全部 / 1 客户 / 2 供应商
export type CSNature = 1 | 2; // 1 企业 / 2 个人
