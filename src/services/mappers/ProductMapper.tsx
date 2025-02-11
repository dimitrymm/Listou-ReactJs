import type { Product } from "@/types/Product";

class ProductMapper {
  toPersistence(domainProduct: Product) {
    return {
      id: domainProduct.id,
      name: domainProduct.name,
      date: domainProduct.date,
      quantity: domainProduct.quantity,
      category_id: domainProduct.category.id,
    };
  }
  toDomain(persistenceProduct: {
    id: any;
    name: any;
    date: any;
    quantity: any;
    category_id: any;
    category_name: any;
  }) {
    return {
      id: persistenceProduct.id,
      name: persistenceProduct.name,
      date: persistenceProduct.date,
      quantity: persistenceProduct.quantity,
      category: {
        id: persistenceProduct.category_id,
        name: persistenceProduct.category_name,
      },
    };
  }
}
export default new ProductMapper();
