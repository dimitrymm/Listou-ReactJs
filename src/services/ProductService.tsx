import HttpClient from "./utils/HttpClient";

// interface Product {
//   name: string;
//   quantity: number;
//   date: any;
//   category_id: string;
// }
class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }
  listProducts() {
    return this.httpClient.get("/products");
  }
  createProduct(product: any) {
    return this.httpClient.post("/products", { body: product });
  }
}

export default new ProductService();
