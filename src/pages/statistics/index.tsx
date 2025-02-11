import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Modal from "@/components/Modal";
import Spinner from "@/components/Spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import type { Product } from "@/types/Product";
import { ProductContext } from "@/utils/contextApi/ProductsProvider";
import FormatDate from "@/utils/FormatDate";
import { CalendarIcon, ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState } from "react";

export default function Statistics() {
  const context = useContext(ProductContext);

  const { toast } = useToast();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchMonth, setSearchMonth] = useState<string>("");
  const [productBeingDeleted, setProductBeingDeleted] = useState<Product>();
  const [isLoadingDelete, setIsLoadingDelete] = useState(false);

  if (!context) {
    throw new Error("Erro no provider");
  }

  const { products, isLoading, reload, deleteProduct } = context;

  function listOfProductsByMonth(products: Product[], searchDate: string) {
    return products.filter((product) => {
      const formattedDate = FormatDate(product.date);

      if (!formattedDate) {
        console.log(`Invalid format of date:${product.name}`);
        return false;
      }
      const [_year, month, _day] = formattedDate.split("/");

      return Number(month) === Number(searchDate);
    });
  }

  useEffect(() => {
    if (products.length > 0) {
      setFilteredProducts(listOfProductsByMonth(products, searchMonth));
    }
  }, [products, searchMonth]);

  function handleDeleteProduct(product: Product) {
    setProductBeingDeleted(product);
  }

  async function handleConfirmDeleteProduct() {
    if (!productBeingDeleted) return;
    try {
      setIsLoadingDelete(true);
      await deleteProduct(productBeingDeleted!.id!);

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
    } finally {
      setIsLoadingDelete(false);
    }
  }
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex md:flex-row flex-col justify-center">
        <main className="flex lg:flex-row lg:mx-6 mx-4 ">
          <Card className="max-w-3xl w-full bg-gray-300 ">
            <CardHeader>
              <CardTitle className="text-2xl text-center font-semibold ">
                <span className="mr-3">Listagem de produtos</span>
                <Button
                  onClick={reload}
                  variant={"outline"}
                  className="hover:bg-blue-600"
                >
                  <ReloadIcon />
                </Button>
              </CardTitle>
            </CardHeader>

            {isLoading ? (
              <Spinner />
            ) : (
              //Listagem de produtos
              products?.map((product: Product) => (
                <div key={product.id} className="p-4 max-w-lg">
                  <Card className="w-full">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl font-bold">
                            {product.name}
                          </CardTitle>
                          <Badge variant="secondary" className="mt-2">
                            {product.category.name}
                          </Badge>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              onClick={() => handleDeleteProduct(product)}
                              variant="ghost"
                              size="icon"
                              className="text-red-500 hover:text-red-700 hover:bg-red-400"
                            >
                              <TrashIcon className="size-6" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <Modal
                              onConfirm={handleConfirmDeleteProduct}
                              isLoading={isLoadingDelete}
                            />
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
                            {product.quantity} unidades.
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
              ))
            )}
          </Card>
        </main>
        <aside className="flex lg:flex-row  lg:mx-6 mx-4 ">
          <Card className="min-w-80 w-full bg-gray-300 ">
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
              //listagem de produtos filtrados por mes
              filteredProducts?.map((product) => (
                <CardContent
                  key={product.id}
                  className="m-1 p-4 shadow-lg rounded-md"
                >
                  <div className="flex items-center gap-4 justify-between">
                    <div>
                      <div>
                        <strong className="mr-4">{product.name}</strong>
                        <span className="text-lg font-bold text-indigo-700 uppercase">
                          {product.category.name}
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
                            className="hover:bg-red-800"
                          >
                            {isLoadingDelete ? (
                              <Spinner />
                            ) : (
                              <TrashIcon className="size-6" />
                            )}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-xs">
                          <Modal
                            onConfirm={handleConfirmDeleteProduct}
                            isLoading={isLoadingDelete}
                          />
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
    </div>
  );
}
