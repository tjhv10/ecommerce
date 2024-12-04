import { Dispatch, SetStateAction, useEffect } from "react";
import { ItemProps } from "../../item/item";

function useSort(
  Items: ItemProps[],
  sort: string,
  setItems: Dispatch<SetStateAction<ItemProps[]>>
) {
  useEffect(() => {
    switch (sort) {
      case "id": {
        const sorted = Items.slice().sort((a: ItemProps, b: ItemProps) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id == b.id) {
            return 0;
          } else {
            return 1;
          }
        });
        setItems(sorted);
        break;
      }
      case "date": {
        const sorted = Items.slice().sort((a: ItemProps, b: ItemProps) => {
          if (Date.parse(a.uploadedDate) < Date.parse(b.uploadedDate)) {
            return -1;
          } else if (
            Date.parse(a.uploadedDate) === Date.parse(b.uploadedDate)
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
        const sorted = Items.slice().sort((a: ItemProps, b: ItemProps) => {
          if (a.price < b.price) {
            return -1;
          } else if (a.price === b.price) {
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
