import { createContext } from "react";
import { ItemProps } from "../components/item/item";
import { quantity } from "../App";

export const CartContext = createContext<{
  items: ItemProps[];
  quantityHash: quantity;
}>({
  items: [],
  quantityHash: {},
});
