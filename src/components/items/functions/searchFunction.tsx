import { Dispatch } from "react";
import { CartItem } from "../../../App";
import { SortEnum } from "../hooks/useSort";

const searchFunction = (
  phrase: string,
  setItems: Dispatch<React.SetStateAction<CartItem[]>>,
  Items: CartItem[],
  setSort: Dispatch<React.SetStateAction<SortEnum>>
) => {
  const result = Items.filter(
    (Item) =>
      Item.product.name.toLowerCase().includes(phrase) ||
      Item.product.category.toLowerCase().includes(phrase) ||
      Item.product.model.toLowerCase().includes(phrase)
  );
  setItems(result);
  setSort(SortEnum.id);
};
export default searchFunction;
