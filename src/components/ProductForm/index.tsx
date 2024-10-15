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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function ProdutctForm() {
  const [productName, setProductName] = useState<string>("");
  const [productDate, setProductDate] = useState<string>("");
  const [productQuantity, setProductQuantity] = useState<string>("");
  const [productCategoryName, setProductCategoryName] = useState<string>("");
  return (
    <>
      <Card className="max-w-2xl w-full bg-gray-300 ">
        <CardHeader>
          <CardTitle>Adicionar Produto</CardTitle>
          <span>Que produto comprou hoje?</span>
        </CardHeader>
        <CardContent>
          <form>
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
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant={"outline"}>Cancelar</Button>
          <Button>Adicionar</Button>
        </CardFooter>
      </Card>
    </>
  );
}
