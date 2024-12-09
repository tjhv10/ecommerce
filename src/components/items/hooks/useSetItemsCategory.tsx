import {
  Dispatch,
  JSXElementConstructor,
  ReactElement,
  SetStateAction,
  useEffect,
} from "react";
import md from "../../../assets/MOCK_DATA.json";
import styles from "../items.module.scss";
import { JSX } from "react/jsx-runtime";
import { CartItem } from "../../../App";
import { subcategoryEnum } from "./useSetFilterChoose";
enum CategoryEnum {
  "No filter" = "No filter",
  "Category" = "Category",
  "Uploaded date" = "Uploaded date",
  "Price" = "Price",
}
function useSetItemsCategory(
  addItem: (item: CartItem) => void,
  subcategory: string | undefined,
  setItems: Dispatch<SetStateAction<CartItem[]>>,
  category: string,
  setSubcategory: Dispatch<subcategoryEnum>,
  filterChooseRef: React.RefObject<HTMLSelectElement>,
  setFilter_chooseSelect: {
    (
      value: SetStateAction<
        | ReactElement<unknown, string | JSXElementConstructor<unknown>>
        | undefined
      >
    ): void;
    (arg0: JSX.Element): void;
  }
) {
  useEffect(() => {
    setItems([]);
    for (const i in md) {
      const item: CartItem = {
        product: md[i],
        quantity: 1,
      };
      switch (category) {
        case CategoryEnum["No filter"]: {
          addItem(item);
          break;
        }
        case CategoryEnum["Category"]: {
          if (item.product.category === subcategory) {
            addItem(item);
          }
          break;
        }
        case CategoryEnum["Price"]: {
          const [lowPrice, highPrice] = subcategory!.split("-");
          if (
            item.product.price >= parseInt(lowPrice) &&
            item.product.price <= parseInt(highPrice)
          )
            addItem(item);
          break;
        }
        case CategoryEnum["Uploaded date"]: {
          if (Date.parse(item.product.uploadedDate) >= Date.parse(subcategory!))
            addItem(item);
          break;
        }
      }
      switch (category) {
        case CategoryEnum["No filter"]: {
          setFilter_chooseSelect(<></>);
          setSubcategory(
            subcategoryEnum["No filter" as keyof typeof subcategoryEnum]
          );
          break;
        }
        default: {
          setFilter_chooseSelect(
            <select
              ref={filterChooseRef}
              className={styles.filtersBarItem}
              name="filter choose"
              value={
                filterChooseRef.current != null
                  ? filterChooseRef.current.value
                  : ""
              }
              onChange={() => {
                setSubcategory(
                  subcategoryEnum[
                    filterChooseRef.current
                      ?.value as keyof typeof subcategoryEnum
                  ]
                );
              }}
            />
          );
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory]);
}

export default useSetItemsCategory;
