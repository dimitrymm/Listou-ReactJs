import HttpClient from "./utils/HttpClient";

class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient("http://localhost:3001");
  }
  listProducts() {
    return this.httpClient.get("/products");
  }
}

export default new ProductService();
