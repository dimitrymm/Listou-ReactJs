import ProductService from "@/services/ProductService";
import type { Product } from "@/types/Product";
import {
  createContext,
  type ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";

interface ProductsContextType {
  products: Product[];
  isLoading: boolean;
  reload: () => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
}

export const ProductContext = createContext<ProductsContextType | undefined>(
  undefined
);

interface ProductsProviderProps {
  children: ReactNode;
}

export default function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      const productList = await ProductService.listProducts();
      setProducts(productList);

      setIsLoading(false);
    } catch (error) {
      console.log("Erro loadproducts", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  async function deleteProduct(id: number): Promise<void> {
    try {
      await ProductService.deleteProduct(id);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== id)
      );
    } catch (error) {
      console.error("Erro ao deletar", error);
      throw error;
    }
  }

  return (
    <ProductContext.Provider
      value={{ products, isLoading, reload: loadProducts, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}
