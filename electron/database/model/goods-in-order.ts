import { DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional, NonAttribute } from '@sequelize/core';
import { Attribute, PrimaryKey, AutoIncrement, NotNull, BelongsTo } from '@sequelize/core/decorators-legacy';
import { PurchaseOrder } from './purchase-order.ts';
import { SalesOrder } from './sales-order.ts';

// @Table({ timestamps: false })
export class GoodsInOrder extends Model<InferAttributes<GoodsInOrder>, InferCreationAttributes<GoodsInOrder>> {
  @Attribute(DataTypes.INTEGER)
  @PrimaryKey
  @AutoIncrement
  declare id: CreationOptional<number>;

  @Attribute(DataTypes.STRING)
  @NotNull()
  declare orderNumber: string;

  @Attribute(DataTypes.STRING)
  @NotNull()
  declare goodsName: string;

  @Attribute(DataTypes.STRING)
  declare sku: string;

  @Attribute(DataTypes.STRING)
  @NotNull()
  declare unit: string;

  @Attribute(DataTypes.REAL)
  @NotNull()
  declare quantity: number;

  @Attribute(DataTypes.REAL)
  @NotNull()
  declare unitPrice: number;

  @Attribute(DataTypes.STRING)
  @NotNull()
  declare currency: string;

  @Attribute(DataTypes.REAL)
  @NotNull()
  declare subtotalPrice: number;

  @Attribute(DataTypes.REAL)
  @NotNull()
  declare taxRate: number;

  @Attribute(DataTypes.REAL)
  @NotNull()
  declare taxAmount: number;

  @Attribute(DataTypes.STRING)
  @NotNull
  declare targetModel: 'purchaseOrder' | 'salesOrder';

  /** Defined by {@link PurchaseOrder#goodsInOrder} */
  declare purchaseOrder?: NonAttribute<PurchaseOrder>;
  //
  /** Defined by {@link SalesOrder#goodsInOrder} */
  declare salesOrder?: NonAttribute<SalesOrder>;

  get target(): NonAttribute<PurchaseOrder | SalesOrder | undefined> {
    if (this.targetModel === 'purchaseOrder') {
      return this.purchaseOrder;
    } else {
      return this.salesOrder;
    }
  }

  // @BelongsTo(() => PurchaseOrder, {
  //   foreignKey: 'orderNumber',
  //   sourceKey: 'orderNumber',
  // })
  // declare purchaseOrder?: NonAttribute<PurchaseOrder | SalesOrder>;
}
