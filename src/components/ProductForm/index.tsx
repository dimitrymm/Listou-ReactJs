"use client";

import DataPicker from "@/components/DataPicker";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import CategoriesService from "@/services/CategoriesService";
import ProductService from "@/services/ProductService";
import { useToast } from "@/hooks/use-toast";
import FormatDate from "@/utils/FormatDate";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome do Produto Precisa ter pelo menos 3 caracteres.",
    })
    .max(15),
  category_name: z.string({
    required_error: "Selecione uma categoria.",
  }),
  quantity: z.coerce
    .number({
      required_error: "Insira uma quantidade.",
    })
    .min(1, {
      message: "Mínimo 1 unidade",
    }),
  date: z.date({
    required_error: "Data da compra é requirido.",
  }),
});

interface categories {
  id: string;
  name: string;
}

export default function ProdutctForm() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<categories[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();
        setCategories(categoriesList);
      } catch (error) {
        console.log("Erro loadCategories", error);
      }
    }
    loadCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const product = {
        name: values.name,
        date: values.date,
        quantity: values.quantity,
        category_id: values.category_name,
      };

      await ProductService.createProduct(product);
      toast({
        title: "Produto Adicionado",
        description: `Comprou:${product.name} em:${product.date}`,
      });
    } catch (error) {
      toast({
        title: "Erro no cadastro de produto",
        variant: "destructive",
      });
      console.log("Erro no cadastro de produto", error);
    }
  }
  return (
    <>
      <Card className="max-w-2xl w-full bg-gray-300 ">
        <CardHeader>
          <CardTitle>Adicionar Produto</CardTitle>
          <span>Que produto comprou hoje?</span>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Produto</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do Produto" {...field} />
                    </FormControl>
                    <FormDescription>
                      Produto que deseja Inserir
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between gap-4">
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Qtd" {...field} />
                      </FormControl>
                      <FormDescription>Quantos?</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category_name"
                  render={({ field }) => (
                    <FormItem className="w-2/4">
                      <FormLabel>Categoria</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent position="popper">
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data da Compra</FormLabel>
                    <DataPicker field={field} />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-between">
                <Button variant={"outline"}>Cancelar</Button>
                <Button type="submit">Adicionar</Button>
              </CardFooter>
            </form>
          </Form>

          {/* <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Nome</Label>
                <Input
                  value={productName}
                  onChange={(event) => setProductName(event.target.value)}
                  id="name"
                  placeholder="Nome do Produto"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="qtd">Qtd</Label>
                <Input
                  value={productQuantity}
                  onChange={(event) => setProductQuantity(event.target.value)}
                  id="qtd"
                  placeholder="Quantidade"
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="date">Quando?</Label>
                <DataPicker />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Categoria</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="Frutas">Frutas</SelectItem>
                    <SelectItem value="Legumes">Legumes</SelectItem>
                    <SelectItem value="Verdut">Verdut</SelectItem>
                    <SelectItem value="Doces">Doces</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </form> */}
        </CardContent>
      </Card>
    </>
  );
}
