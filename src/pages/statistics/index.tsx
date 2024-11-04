import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { CalendarIcon, TrashIcon } from "@radix-ui/react-icons";
import { useCallback, useEffect, useState } from "react";

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
  const [searchMonth, setSearchMonth] = useState<string>("");
  const [productBeingDeleted, setProductBeingDeleted] = useState<Product>();
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

  function listOfProductsByMonth(products: Product[], searchDate: string) {
    const monthsList = products.map((product) => {
      const data = new Date(product.date);
      return data.getMonth() + 1;
    });

    console.log("Lista de Meses", monthsList);
    return products.filter((product) => {
      const formattedDate = FormatDate(product.date);
      console.log("formattedDate", formattedDate);

      if (!formattedDate) {
        console.log(`Invalid format of date:${product.name}`);
        return false;
      }
      const [_year, month, _day] = formattedDate.split("/");

      return Number(month) === Number(searchDate);
    });
  }

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(() => {
    console.log(searchMonth);

    if (products.length > 0) {
      setFilteredProducts(listOfProductsByMonth(products, searchMonth));
    }
  }, [products, searchMonth]);

  function handleDeleteProduct(product: Product) {
    setProductBeingDeleted(product);
  }

  console.log("Produtos filtrados:", filteredProducts);

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
      <div className="flex md:flex-row flex-col justify-center">
        <main className="flex lg:flex-row lg:mx-6 mx-4 ">
          <Card className="max-w-3xl w-full bg-gray-300 ">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-semibold">
                Listagem de produtos
              </CardTitle>
            </CardHeader>

            {isLoading ? (
              <div role="status" className="text-center">
                <svg
                  aria-hidden="true"
                  className="inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              products?.map((product) => (
                <div className="p-4 max-w-sm">
                  <Card className="w-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold">
                            {product.name}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {product.category_name}
                          </Badge>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => handleDeleteProduct(product)}
                              variant={"ghost"}
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-100"
                            >
                              <TrashIcon className="size-6" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <Modal onConfirm={handleConfirmDeleteProduct} />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">
                            Quantidade:
                          </span>
                          <span className="font-medium">
                            {product.quantity} unidades
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-500">Data:</span>
                          </div>
                          <span className="font-medium">
                            {new Date(product.date).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                // <CardContent
                //   key={product.id}
                //   className="p-4 border border-black rounded-md hover:bg-indigo-400"
                // >
                //   <div className="flex items-center justify-between">
                //     <div>
                //       <div>
                //         <strong className="mr-4">{product.name}</strong>
                //         <span className="text-lg font-bold text-indigo-700 uppercase">
                //           {product.category_name}
                //         </span>
                //       </div>
                //       <div>
                //         <span>{product.quantity}Un. </span>
                //         <span>Em: {FormatDate(product.date)}</span>
                //       </div>
                //     </div>
                //     <div>
                //       <Dialog>
                //         <DialogTrigger asChild>
                //           <Button
                //             onClick={() => handleDeleteProduct(product)}
                //             variant={"destructive"}
                //           >
                //             <TrashIcon className="size-6" />
                //           </Button>
                //         </DialogTrigger>
                //         <DialogContent className="max-w-xs">
                //           <Modal onConfirm={handleConfirmDeleteProduct} />
                //         </DialogContent>
                //       </Dialog>
                //     </div>
                //   </div>
                // </CardContent>
              ))
            )}
          </Card>
        </main>
        <aside className="flex lg:flex-row  lg:mx-6 mx-4 ">
          <Card className="max-w-2xl w-full bg-gray-300 ">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-semibold">
                Pesquise Por Mês
              </CardTitle>
              <Select value={searchMonth} onValueChange={setSearchMonth}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o Mês:" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="01">Janeiro</SelectItem>
                    <SelectItem value="02">Fevereiro</SelectItem>
                    <SelectItem value="03">Março</SelectItem>
                    <SelectItem value="04">Abril</SelectItem>
                    <SelectItem value="05">Maio</SelectItem>
                    <SelectItem value="06">Junho</SelectItem>
                    <SelectItem value="07">Julho</SelectItem>
                    <SelectItem value="08">Agosto</SelectItem>
                    <SelectItem value="09">Setembro</SelectItem>
                    <SelectItem value="10">Outubro</SelectItem>
                    <SelectItem value="11">Novembro</SelectItem>
                    <SelectItem value="12">Dezembro</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </CardHeader>
            {filteredProducts.length <= 0 ? (
              <CardDescription className="text-center">
                Não existem produtos neste mês!
              </CardDescription>
            ) : (
              filteredProducts?.map((product) => (
                <CardContent
                  key={product.id}
                  className="p-4 border border-black rounded-md hover:bg-indigo-400"
                >
                  <div className="flex items-center gap-4 justify-between">
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
              ))
            )}
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
