import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
  NonAttribute,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyAddAssociationsMixin,
  HasManyCreateAssociationMixin,
  SaveOptions,
} from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, Table, Unique, Index, Default, HasMany } from '@sequelize/core/decorators-legacy';
import { GoodsInOrder } from './goods-in-order.ts';

// @Table({ timestamps: false })
export class PurchaseOrder extends Model<InferAttributes<PurchaseOrder>, InferCreationAttributes<PurchaseOrder>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @Unique()
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull()
  @Unique()
  declare orderNumber: string;

  @Attribute(DataTypes.STRING)
  @NotNull()
  declare supplier: string;

  @Attribute(DataTypes.STRING)
  declare warehouse: string;

  @Attribute(DataTypes.DATE)
  @NotNull()
  declare orderDate: Date;

  @Attribute(DataTypes.DATE)
  @NotNull()
  declare readyDay: Date;

  @Attribute(DataTypes.INTEGER)
  @NotNull()
  declare totalPrice: number;

  @Attribute(DataTypes.STRING)
  @NotNull()
  declare currency: string;

  @HasMany(() => GoodsInOrder, {
    foreignKey: 'orderNumber',
    sourceKey: 'orderNumber',
    inverse: {
      as: 'purchaseOrders',
    },
    // Foreign Keys must be disabled.
    foreignKeyConstraints: false,
    // This scope ensures that loading the "comments" association only loads comments that belong to videos.
    scope: {
      targetModel: 'purchaseOrder',
    },
  })
  declare goodsInOrder?: NonAttribute<GoodsInOrder[]>;

  // declare getGoodsInOrder: HasManyGetAssociationsMixin<GoodsInOrder>;
  //
  // declare setGoodsInOrders: HasManySetAssociationsMixin<
  //   GoodsInOrder,
  //   /* this is the type of the primary key of the target */
  //   GoodsInOrder['id']
  // >;
  //
  // declare addGoodsInOrder: HasManyAddAssociationMixin<
  //   GoodsInOrder,
  //   /* this is the type of the primary key of the target */
  //   GoodsInOrder['id']
  // >;
  //
  // declare addGoodsInOrders: HasManyAddAssociationsMixin<
  //   GoodsInOrder,
  //   /* this is the type of the primary key of the target */
  //   GoodsInOrder['id']
  // >;
  //
  // declare createGoodsInOrder: HasManyCreateAssociationMixin<GoodsInOrder, 'orderNumber'>;
}
