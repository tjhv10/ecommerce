import { Dispatch } from "react";
import { CartItem } from "../../../App";

const searchFunction = (
  phrase: string,
  setItems: Dispatch<React.SetStateAction<CartItem[]>>,
  Items: CartItem[],
  setSort: Dispatch<React.SetStateAction<string>>
) => {
  const result = Items.filter(
    (Item) =>
      Item.product.name.toLowerCase().includes(phrase) ||
      Item.product.category.toLowerCase().includes(phrase) ||
      Item.product.model.toLowerCase().includes(phrase)
  );
  setItems(result);
  setSort("id");
};
export default searchFunction;
