import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, Sequelize } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, Index, Default } from '@sequelize/core/decorators-legacy';

// @Table({ schema: 'public' })
export class Metadata extends Model<InferAttributes<Metadata>, InferCreationAttributes<Metadata>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull
  // @Unique
  @Index({ name: 'category-symbol' })
  declare category: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare name: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare enName: string;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare code: string;

  @Attribute(DataTypes.STRING)
  @Index({ name: 'category-symbol' })
  declare symbol: string;

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
