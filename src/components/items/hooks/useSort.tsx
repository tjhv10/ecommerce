import { Dispatch, SetStateAction, useEffect } from "react";
import { CartItem } from "../../../App";

function useSort(
  items: CartItem[],
  sort: string,
  setItems: Dispatch<SetStateAction<CartItem[]>>
) {
  useEffect(() => {
    switch (sort) {
      // TODO: add enum for sort type
      case "id": {
        const sorted = items.slice().sort((a: CartItem, b: CartItem) => {
          // TODO: tkae this out to external function
          if (a.product.id < b.product.id) {
            return -1;
          } else if (a.product.id === b.product.id) {
            return 0;
          } else {
            return 1;
          }
        });
        setItems(sorted);
        break;
      }
      case "date": {
        const sorted = items.slice().sort((a: CartItem, b: CartItem) => {
          const dateA = Date.parse(a.product.uploadedDate);
          const dateB = Date.parse(b.product.uploadedDate);

          if (dateA < dateB) {
            return -1;
          } else if (dateA === dateB) {
            return 0;
          } else {
            return 1;
          }
        });
        setItems(sorted);
        break;
      }
      case "price": {
        const sorted = items.slice().sort((a: CartItem, b: CartItem) => {
          if (a.product.price < b.product.price) {
            return -1;
          } else if (a.product.price === b.product.price) {
            return 0;
          } else {
            return 1;
          }
        });
        setItems(sorted);
        break;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);
}

export default useSort;
