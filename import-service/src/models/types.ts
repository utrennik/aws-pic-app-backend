export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  count: number;
  imageUrl?: string;
}

export interface IProductData {
  title: string;
  description: string;
  price: number;
  count?: number;
  imageUrl?: string;
}
