import { createContext } from "react";
import { ItemProps } from "../components/item/item";

export const CartContext = createContext<{ items: ItemProps[] }>({
  items: [],
});
