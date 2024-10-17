import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ProductService from "@/services/ProductService";
import FormatDate from "@/utils/FormatDate";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  quantity: number;
  date: any;
  category_name: string;
}
export default function Statistics() {
  const [products, setProducts] = useState<Product[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);

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
  console.log();

  return (
    <>
      <Header />
      <main className="flex lg:flex-row  sm:mx-72 mx-4 ">
        <Card className="max-w-lg w-full bg-gray-300 ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Listagem de produtos
            </CardTitle>
          </CardHeader>

          {products?.map((product) => (
            <CardContent
              key={product.id}
              className="p-4 border border-black rounded-md hover:bg-indigo-400"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div>
                    <strong className="mr-4">{product.name}</strong>
                    <span className="text-lg font-bold text-indigo-700 uppercase">
                      {product.category_name}
                    </span>
                  </div>
                  <div>
                    <span>{product.quantity}Un. </span>
                    <span>Em: {FormatDate(product.date)}</span>
                  </div>
                </div>
                <div>
                  <Button variant={"destructive"}>
                    <TrashIcon className="size-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          ))}
        </Card>
      </main>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
      <Footer />
    </>
  );
}
