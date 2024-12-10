import { Dispatch, SetStateAction, useEffect } from "react";
import { CartItem } from "../../../App";
export enum SortEnum {
  "id" = "id",
  "date" = "date",
  "price" = "price",
}
const sorts = new Map([
  [
    SortEnum.date,
    (items: CartItem[]) =>
      items
        .slice()
        .sort(
          (a, b) =>
            Date.parse(a.product.uploadedDate) -
            Date.parse(b.product.uploadedDate)
        ),
  ],
  [
    SortEnum.id,
    (items: CartItem[]) =>
      items.slice().sort((a, b) => a.product.id - b.product.id),
  ],
  [
    SortEnum.price,
    (items: CartItem[]) =>
      items.slice().sort((a, b) => a.product.price - b.product.price),
  ],
]);

function useSort(
  sort: SortEnum,
  setItems: Dispatch<SetStateAction<CartItem[]>>
) {
  useEffect(() => {
    setItems(sorts.get(SortEnum[sort as SortEnum])!);
  }, [setItems, sort]);
}

export default useSort;
