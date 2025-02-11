class ProductMapper {
  toPersistence(domainProduct) {
    return {
      id: domainProduct.id,
      name: domainProduct.name,
      date: domainProduct.date,
      quantity: domainProduct.quantity,
      category_id: domainProduct.category_id,
    };
  }
  toDomain(persistenceProduct) {
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
