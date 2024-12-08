import { Dispatch, SetStateAction, useEffect } from "react";
import { CartItem } from "../../../App";

function useSort(
  Items: CartItem[],
  sort: string,
  setItems: Dispatch<SetStateAction<CartItem[]>>
) {
  useEffect(() => {
    switch (sort) {
      case "id": {
        const sorted = Items.slice().sort((a: CartItem, b: CartItem) => {
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
        const sorted = Items.slice().sort((a: CartItem, b: CartItem) => {
          if (
            Date.parse(a.product.uploadedDate) <
            Date.parse(b.product.uploadedDate)
          ) {
            return -1;
          } else if (
            Date.parse(a.product.uploadedDate) ===
            Date.parse(b.product.uploadedDate)
          ) {
            return 0;
          } else {
            return 1;
          }
        });
        setItems(sorted);
        break;
      }
      case "price": {
        const sorted = Items.slice().sort((a: CartItem, b: CartItem) => {
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
