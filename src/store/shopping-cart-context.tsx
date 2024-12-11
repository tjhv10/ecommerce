import React from "react";
import { ItemProps } from "../components/Item/Item";
export enum ButtonsEnum {
  AddToCartAndGoToItemPage,
  PlusMinus,
  Remove,
}
export interface CartItem {
  product: ItemProps;
  quantity: number;
  buttons: Map<ButtonsEnum, boolean>;
}

export const CartContext = React.createContext<{
  shoppingCart: CartItem[];
  setShoppingCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}>({
  shoppingCart: [],
  setShoppingCart: () => {},
});
