import React from "react";
import { ItemProps } from "../components/Item/Item";

interface CartItem {
  product: ItemProps;
  quantity: number;
}

export const CartContext = React.createContext<{
  shoppingCart: CartItem[];
  setShoppingCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}>({
  shoppingCart: [],
  setShoppingCart: () => {},
});
