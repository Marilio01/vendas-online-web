export interface CartType {
  id: number;
  amount: number;
  product: {
    id: number;
    name: string;
    price: number;
    image: string;
  };
}