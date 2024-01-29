import { Product } from '%/database/model/product.ts';
import { AnyObject } from '@/utils/types.ts';
import { generateResponse } from '@/api/commont.ts';

export const getProducts = (params: AnyObject) => {
  return Product.findAll(params);
};

export const getProductsDetail = async (id: number): Promise<Product | null> => {
  return Product.findOne({ where: { id: id } });
};

export const updateProducts = async (params: Product) => {
  return generateResponse('update', Product.update(params.dataValues, { where: { id: params.id } }));
};

export const addProduct = (params: Product) => {
  return generateResponse('create', Product.create(params));
};

export const deleteProduct = (id: number | string) => {
  return generateResponse('delete', Product.destroy({ where: { id: id } }));
};
