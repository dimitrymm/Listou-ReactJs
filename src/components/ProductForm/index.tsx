"use client";

import DataPicker from "@/components/DataPicker";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useCallback, useEffect, useState } from "react";
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

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome do Produto Precisa ter pelo menos 3 caracteres.",
    })
    .max(15, {
      message: "Nome do Produto Precisa ter no maximo 15 caracteres.",
    }),
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

const formCategorySchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Nome do Produto Precisa ter pelo menos 3 caracteres.",
    })
    .max(15, {
      message: "Nome do Produto Precisa ter no maximo 15 caracteres.",
    }),
});

export default function ProdutctForm() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  const loadCategories = useCallback(async () => {
    try {
      setIsLoadingCategories(true);
      const categoriesList = await CategoriesService.listCategories();
      setCategories(categoriesList);
      setIsLoadingCategories(false);
    } catch (error) {
      console.log("Erro loadCategories", error);
    } finally {
      setIsLoadingCategories(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      quantity: 0,
    },
  });
  const categoryForm = useForm<z.infer<typeof formCategorySchema>>({
    resolver: zodResolver(formCategorySchema),
    defaultValues: {
      name: "",
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
        description: `Comprou: ${product.name} em: ${new Date(
          product.date
        ).toLocaleDateString("pt-BR")}`,
        color: "green",
      });
    } catch (error) {
      toast({
        title: "Erro no cadastro de produto",
        variant: "destructive",
      });
      console.log("Erro no cadastro de produto", error);
    }
  }
  async function onCategorySubmit(values: z.infer<typeof formCategorySchema>) {
    try {
      const category = {
        name: values.name,
      };

      await CategoriesService.createCategory(category);
      loadCategories();
      toast({
        title: "Categoria Adicionada",
        description: "",
      });
    } catch (error) {
      toast({
        title: "Erro no cadastro de categoria",
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
          <CardDescription>Que produto comprou hoje?</CardDescription>
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
                      {isLoadingCategories ? (
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
                        <Select
                          disabled={isLoadingCategories}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {categories.map((category) => (
                              <SelectItem
                                key={category.id}
                                value={
                                  category.id ? category.id.toString() : ""
                                }
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
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
        </CardContent>
      </Card>
      {/* Form Category */}
      <Card>
        <CardHeader>
          <CardTitle>Categorias</CardTitle>
          <CardDescription>Adicione a Categoria</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...categoryForm}>
            <form
              onSubmit={categoryForm.handleSubmit(onCategorySubmit)}
              className=" space-y-6"
            >
              <FormField
                control={categoryForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da Categoria" {...field} />
                    </FormControl>
                    <FormDescription>
                      Categoria que deseja Inserir
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CardFooter className="flex justify-between">
                <Button variant={"outline"}>Cancelar</Button>
                <Button type="submit">Adicionar</Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
}
