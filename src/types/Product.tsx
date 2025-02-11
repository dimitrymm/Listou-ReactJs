export interface Product {
  id: number;
  name: string;
  quantity: number;
  date: Date;
  category: {
    id: string;
    name: string;
  };
}
