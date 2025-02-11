import { CalendarIcon, TrashIcon } from "@radix-ui/react-icons";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import Modal from "../Modal";
import type { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
  handleDeleteProduct: (product: Product) => void;
  handleConfirmDeleteProduct: () => Promise<void> | void;
  isLoadingDelete: boolean;
}

export default function ProductCard({
  product,
  handleDeleteProduct,
  handleConfirmDeleteProduct,
  isLoadingDelete,
}: ProductCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{product.name}</CardTitle>
            <Badge variant="default" className="">
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
            <span className="text-sm text-gray-500">Quantidade:</span>
            <span className="font-medium">{product.quantity} unidades.</span>
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
  );
}
