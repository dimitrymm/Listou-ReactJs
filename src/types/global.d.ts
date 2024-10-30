declare global {
  type Product = {
    id: number;
    name: string;
    quantity: number;
    date: Date;
    category_name: string;
  };
  type Category = {
    id: number;
    name: string;
  };
}
export {};
