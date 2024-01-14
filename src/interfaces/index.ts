
export interface Product {
  productId: number | any;
  name: string;
  description: string;
  price: number | any;
  image: string;
  sumRatings: any;
  countRatings: any;
  quantity :any

}
export interface Category {
    categoryId: number;
    name: string;
  }


  export interface CategoryData {
    categoryId: number | any;
    name: string;
}


export interface Order {
  orderId: number,
  totalPrice: number,
  status: string,
  addressId: number,
  created_at: string,
  orderItems: OrderItem[];
  address: address
}

export interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: number; 
  product: any;

}
export interface address {
  phone: number;
  city: city;
  district: string;
  address: string;
  firstName: string;
  lastName: string;
}
export interface city {
  name: string;
}



export interface InfoUserData {
  firstName: any;
  lastName: any;
  email: string;
  phone: string

}
