import HttpClient from "./utils/HttpClient";
interface Product {
  name: string;
  quantity: number;
  date: Date;
  category_id: string;
}
class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
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
