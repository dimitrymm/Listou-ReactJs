import type { Product } from "@/types/Product";
import ProductMapper from "./mappers/ProductMapper";
import HttpClient from "./utils/HttpClient";

// const url = "http://localhost:3001";
const url = "https://shp-api.vercel.app";

class ProductService {
  httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient(url);
  }
  async listProducts() {
    const products = await this.httpClient.get("/products");
    return products.map(ProductMapper.toDomain);
  }

  createProduct(product: Product) {
    const body = ProductMapper.toPersistence(product);
    return this.httpClient.post("/products", { body });
  }
  deleteProduct(id: number | undefined) {
    return this.httpClient.delete(`/products/${id}`);
  }
}

export default new ProductService();
