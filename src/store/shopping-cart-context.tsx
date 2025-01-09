import React from "react";
import { ItemProps } from "../components/Item/item";
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
  addId: number;
  setAddId: React.Dispatch<React.SetStateAction<number>>;
}>({
  shoppingCart: [],
  setShoppingCart: () => {},
  addId: 1,
  setAddId: () => {},
});
