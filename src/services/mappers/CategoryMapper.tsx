import type { Category } from "@/types/Category";

class CategoryMapper {
  toPersistence(domainCategory: Category) {
    return {
      id: domainCategory.id,
      name: domainCategory.name,
    };
  }
  toDomain(persistenceCategory: { id: any; name: any }) {
    return {
      id: persistenceCategory.id,
      name: persistenceCategory.name,
    };
  }
}
export default new CategoryMapper();
