import HttpClient from "./utils/HttpClient";

class CategoriesService {
  httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient("https://shp-api.vercel.app");
    // "http://localhost:3001"
  }
  listCategories() {
    return this.httpClient.get("/categories");
  }
  createCategory(category: Category) {
    return this.httpClient.post("/categories", { body: category });
  }
}
export default new CategoriesService();
