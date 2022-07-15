export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  count: number;
}

export interface IProductData {
  title: string;
  description: string;
  price: number;
  count?: number;
}
