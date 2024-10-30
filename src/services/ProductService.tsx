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
    this.httpClient = new HttpClient("https://shp-api.vercel.app/");
  }
  listProducts() {
    return this.httpClient.get("/products");
  }
  createProduct(product: Product) {
    return this.httpClient.post("/products", { body: product });
  }
  deleteProduct(id) {
    return this.httpClient.delete(`/products/${id}`);
  }
}

export default new ProductService();
