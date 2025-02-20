import type { Category } from "@/types/Category";
import CategoryMapper from "./mappers/CategoryMapper";
import HttpClient from "./utils/HttpClient";

// const url = "http://localhost:3001";
const url = "https://shp-api.vercel.app";

class CategoriesService {
  httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient(url);
  }
  async listCategories() {
    const categories = await this.httpClient.get("/categories");
    return categories.map(CategoryMapper.toDomain);
  }
  createCategory(category: Category) {
    const body = CategoryMapper.toPersistence(category);
    return this.httpClient.post("/categories", { body });
  }
}
export default new CategoriesService();
