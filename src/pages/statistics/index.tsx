import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import ProductService from "@/services/ProductService";
import FormatDate from "@/utils/FormatDate";
import { TrashIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";
import { date } from "zod";

interface Product {
  id: number;
  name: string;
  quantity: number;
  date: Date;
  category_name: string;
}
export default function Statistics() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [month, setMonth] = useState<number[]>([]);
  const [searchMonth, setSearchMonth] = useState();
  const [productBeingDeleted, setProductBeingDeleted] = useState<Product>();
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

  function getMonth(products: Product[]) {}

  function listOfProductsByMonth(products: Product[], month: string) {
    const monthsList = products.map((product) => {
      const data = new Date(product.date);
      return data.getMonth() + 1;
    });

    console.log("Lista de produtos", products);
    console.log("Lista de Meses", monthsList);
    return products.filter((product) => {});
  }

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    if (products.length > 0) {
      listOfProductsByMonth(products, month);
    }
  }, [products]);

  function handleTryAgain() {
    loadProducts();
  }

  function handleSearchMonth(event) {
    console.log("Mês Selecionado :", event.target.value);
  }

  function handleDeleteProduct(product) {
    setProductBeingDeleted(product);
  }

  async function handleConfirmDeleteProduct() {
    try {
      await ProductService.deleteProduct(productBeingDeleted?.id);
      setProducts((prevState: Product[]) =>
        prevState?.filter(
          (product: Product) => product.id !== productBeingDeleted?.id
        )
      );
      toast({
        title: "Produto Deletado com sucesso!",
        style: {
          backgroundColor: "green",
          color: "#fff",
        },
      });
    } catch {
      toast({
        variant: "destructive",
        title: "Ocorreu um erro ao deletar o produto!",
        style: {
          backgroundColor: "red",
          color: "#fff",
        },
      });
    }
  }

  return (
    <>
      <Header />
      <div className="flex justify-center">
        <main className="flex lg:flex-row lg:mx-6 mx-4 ">
          <Card className="max-w-2xl w-full bg-gray-300 ">
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleDeleteProduct(product)}
                          variant={"destructive"}
                        >
                          <TrashIcon className="size-6" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xs">
                        <Modal onConfirm={handleConfirmDeleteProduct} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            ))}
          </Card>
        </main>
        <aside className="flex lg:flex-row  lg:mx-6 mx-4 ">
          <Card className="max-w-lg w-full bg-gray-300 ">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold">
                Pesquise Por Mês
              </CardTitle>
              <Select value={searchMonth} onValueChange={handleSearchMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o Mês:" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Janeiro">Janeiro</SelectItem>
                    <SelectItem value="Fevereiro">Fevereiro</SelectItem>
                    <SelectItem value="Março">Março</SelectItem>
                    <SelectItem value="Abril">Abril</SelectItem>
                    <SelectItem value="Maio">Maio</SelectItem>
                    <SelectItem value="Junho">Junho</SelectItem>
                    <SelectItem value="Julho">Julho</SelectItem>
                    <SelectItem value="Agosto">Agosto</SelectItem>
                    <SelectItem value="Setembro">Setembro</SelectItem>
                    <SelectItem value="Outubro">Outubro</SelectItem>
                    <SelectItem value="Novembro">Novembro</SelectItem>
                    <SelectItem value="Dezembro">Dezembro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => handleDeleteProduct(product)}
                          variant={"destructive"}
                        >
                          <TrashIcon className="size-6" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-xs">
                        <Modal onConfirm={handleConfirmDeleteProduct} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            ))}
          </Card>
        </aside>
      </div>

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
