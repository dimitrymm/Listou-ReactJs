import Spinner from "../Spinner";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

type ModalProps = {
  onConfirm: () => void;
  isLoading: boolean;
};

export default function Modal({ onConfirm, isLoading }: ModalProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle> Deletar Produto? </DialogTitle>
        <DialogDescription>
          Tem certeza que deseja deletar o produto?
        </DialogDescription>
        <div className="flex items-center space-x-2">
          <div className="flex gap-2">
            <DialogFooter className="flex items-center">
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                onClick={onConfirm}
                disabled={isLoading}
                variant="destructive"
              >
                {isLoading ? <Spinner /> : <p>Deletar</p>}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogHeader>
    </>
  );
}
