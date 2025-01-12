import { Dispatch } from "react";
import { CartItem } from "../../../Store/shopping-cart-context";
export const removeItemFromCart = (
  ItemId: number,
  shoppingCart: CartItem[],
  setShoppingCart: Dispatch<React.SetStateAction<CartItem[]>>
) => {
  setShoppingCart(shoppingCart.filter((item) => item.product.id !== ItemId));
};

const searchFunction = (
  phrase: string,
  setItems: Dispatch<React.SetStateAction<CartItem[]>>,
  Items: CartItem[]
) => {
  const result = Items.filter((Item) => Item.product.name.toLowerCase().includes(phrase));
  setItems(result);
};
export default searchFunction;
