import { Dispatch, SetStateAction, useEffect } from "react";
import { CartItem } from "../../../App";

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
      // TODO: add enum for sort type
      case "id": {
        const sorted = items.slice().sort((a: CartItem, b: CartItem) => {
          // TODO: tkae this out to external function
          return sortFunction(a.product.id, b.product.id);
        });
        setItems(sorted);
        break;
      }
      case "date": {
        const sorted = items.slice().sort((a: CartItem, b: CartItem) => {
          const dateA = Date.parse(a.product.uploadedDate);
          const dateB = Date.parse(b.product.uploadedDate);

          return sortFunction(dateA, dateB);
        });
        setItems(sorted);
        break;
      }
      case "price": {
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
