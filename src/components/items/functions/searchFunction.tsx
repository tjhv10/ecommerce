import { RefObject, Dispatch } from "react";
import { CartItem } from "../../../App";

const searchFunction = (
  phrase: string,
  setItems: Dispatch<React.SetStateAction<CartItem[]>>,
  Items: CartItem[],
  setSort: Dispatch<React.SetStateAction<string>>,
  sortRef: RefObject<HTMLSelectElement>
) => {
  const result = Items.filter(
    (Item) =>
      Item.product.name.toLowerCase().includes(phrase) ||
      Item.product.category.toLowerCase().includes(phrase) ||
      Item.product.model.toLowerCase().includes(phrase)
  );
  setItems(result);
  setSort("id");
  if (sortRef.current) sortRef.current.selectedIndex = 0;
};
export default searchFunction;
