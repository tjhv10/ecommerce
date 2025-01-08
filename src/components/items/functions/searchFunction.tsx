import { Dispatch } from "react";
import { CartItem } from "../../../Store/shopping-cart-context";
import { SortEnum } from "../hooks/useSort";
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
  Items: CartItem[],
  setSort: Dispatch<React.SetStateAction<SortEnum>>
) => {
  const result = Items.filter(
    (Item) =>
      Item.product.name.toLowerCase().includes(phrase) ||
      Item.product.categories.toLowerCase().includes(phrase) ||
      Item.product.model.toLowerCase().includes(phrase)
  );
  setItems(result);
  setSort(SortEnum.id);
};
export default searchFunction;
