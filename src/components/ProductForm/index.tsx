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
import { useContext, useState } from "react";
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
import Spinner from "../Spinner";
import { CategoryContext } from "@/utils/contextApi/CategoriesProvider";
import type { Category } from "@/types/Category";
import type { Product } from "@/types/Product";

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
      message: "Nome da Categoria precisa de no minimo 3 caracteres",
    })
    .max(15, {
      message: "Nome da Categoria no maximo 15 caracteres",
    }),
});

export default function ProductForm() {
  const context = useContext(CategoryContext);
  const { toast } = useToast();

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isCategorySubmiting, setIsCategorySubmiting] = useState(false);

  if (!context) {
    throw new Error("Erro no provider");
  }

  const { categories, isLoadingCategories, reload } = context;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const categoryForm = useForm<z.infer<typeof formCategorySchema>>({
    resolver: zodResolver(formCategorySchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmiting(true);
    try {
      const product: Product = {
        name: values.name,
        date: values.date,
        quantity: values.quantity,
        category: {
          id: values.category_name,
        },
      };

      await ProductService.createProduct(product);
      setIsSubmiting(false);

      toast({
        title: "Produto Adicionado",
        description: `Comprou:${product.name} em:${new Date(
          product.date
        ).toLocaleDateString("pt-Br")}`,
        style: {
          backgroundColor: "green",
          color: "#fff",
        },
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
    setIsCategorySubmiting(true);
    try {
      const category: Category = {
        name: values.name,
      };

      await CategoriesService.createCategory(category);
      setIsCategorySubmiting(false);

      toast({
        title: "Categoria Adicionada",
        description: "",
        style: {
          backgroundColor: "green",
          color: "#fff",
        },
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
    <div className="flex flex-col md:flex-row">
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
                      <Input
                        placeholder="Nome do Produto"
                        {...field}
                        disabled={isSubmiting}
                      />
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
                        <Input
                          type="number"
                          placeholder="Qtd"
                          {...field}
                          disabled={isSubmiting}
                          onChange={field.onChange}
                        />
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
                        <Spinner />
                      ) : (
                        <Select
                          disabled={isLoadingCategories || isSubmiting}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent position="popper">
                            {categories.map((category: Category) => (
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
                disabled={isSubmiting}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Data da Compra</FormLabel>
                    <DataPicker field={field} />
                  </FormItem>
                )}
              />
              <CardFooter className="flex justify-center ">
                <Button
                  type="submit"
                  className="text-2xl md:text-sm group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20"></div>
                  </div>
                  Adicionar
                </Button>
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

              <CardFooter className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isCategorySubmiting}
                  onClick={reload}
                  className="text-2xl md:text-sm group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200 transition hover:scale-110"
                >
                  <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                    <div className="relative h-full w-8 bg-white/20"></div>
                  </div>
                  {isCategorySubmiting ? <Spinner /> : <p>Adicionar</p>}
                </Button>
              </CardFooter>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
