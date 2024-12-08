import { SetStateAction, RefObject, Dispatch } from "react";
import { CartItem } from "../../../App";

const search = (
  phrase: string,
  setItems: Dispatch<React.SetStateAction<CartItem[]>>,
  Items: CartItem[],
  setSort: { (value: SetStateAction<string>): void; (arg0: string): void },
  sortRef: RefObject<HTMLSelectElement>
) => {
  const result = Items.filter(
    (Item) =>
      Item.product.name.toLowerCase().substring(0, phrase.length) ===
        phrase.toLowerCase().trim() ||
      Item.product.category.toLowerCase().substring(0, phrase.length) ===
        phrase.toLowerCase().trim() ||
      Item.product.model.toLowerCase().substring(0, phrase.length) ===
        phrase.toLowerCase().trim() ||
      Item.product.brand.toLowerCase().substring(0, phrase.length) ===
        phrase.toLowerCase().trim()
  );
  setItems(result);
  setSort("id");
  if (sortRef.current) sortRef.current.selectedIndex = 0;
};
export default search;
