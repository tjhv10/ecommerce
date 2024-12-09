import { Dispatch, SetStateAction, useEffect } from "react";
import { CartItem } from "../../../App";
enum SortEnum {
  "id" = "id",
  "date" = "date",
  "price" = "price",
}
function useSort(
  items: CartItem[],
  sort: string,
  setItems: Dispatch<SetStateAction<CartItem[]>>
) {
  useEffect(() => {
    function sortFunction(a: number, b: number) {
      if (a < b) {
        return -1;
      } else if (a === b) {
        return 0;
      } else {
        return 1;
      }
    }
    switch (sort) {
      case SortEnum.id: {
        const sorted = items.slice().sort((a: CartItem, b: CartItem) => {
          return sortFunction(a.product.id, b.product.id);
        });
        setItems(sorted);
        break;
      }
      case SortEnum.date: {
        const sorted = items.slice().sort((a: CartItem, b: CartItem) => {
          const dateA = Date.parse(a.product.uploadedDate);
          const dateB = Date.parse(b.product.uploadedDate);

          return sortFunction(dateA, dateB);
        });
        setItems(sorted);
        break;
      }
      case SortEnum.price: {
        const sorted = items.slice().sort((a: CartItem, b: CartItem) => {
          return sortFunction(a.product.price, b.product.price);
        });
        setItems(sorted);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);
}

export default useSort;
