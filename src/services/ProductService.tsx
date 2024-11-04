import HttpClient from "./utils/HttpClient";

class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient("https://shp-api.vercel.app");
  }
  listProducts() {
    return this.httpClient.get("/products");
  }
  createProduct(product: Product) {
    return this.httpClient.post("/products", { body: product });
  }
  deleteProduct(id: number | undefined) {
    return this.httpClient.delete(`/products/${id}`);
  }
}

export default new ProductService();
