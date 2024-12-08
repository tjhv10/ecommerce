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
import { CategoryEnum } from "../items";

function useSetItemsCategory(
  addItem: (item: CartItem) => void,
  subcategory: string,
  setItems: Dispatch<SetStateAction<CartItem[]>>,
  category: string,
  setSubcategory: Dispatch<CategoryEnum>,
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
        // TODO: add enum
        case "": {
          addItem(item);
          break;
        }
        case "Category": {
          if (item.product.category === subcategory) {
            addItem(item);
          }
          break;
        }
        case "Price": {
          // TODO: rename these variables
          const [a, b] = subcategory.split("-");
          if (
            item.product.price >= parseInt(a) &&
            item.product.price <= parseInt(b)
          )
            addItem(item);
          break;
        }
        case "Uploaded date": {
          if (Date.parse(item.product.uploadedDate) >= Date.parse(subcategory))
            addItem(item);
          break;
        }
      }
      switch (category) {
        case "": {
          setFilter_chooseSelect(<></>);
          setSubcategory(filterChooseRef.current.value);
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
                if (filterChooseRef.current) {
                  setSubcategory(filterChooseRef.current.value);
                }
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
