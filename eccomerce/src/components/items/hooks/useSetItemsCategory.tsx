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

function useSetItemsCategory(
  addItem: (item: CartItem) => void,
  subcategory: string,
  setItems: Dispatch<SetStateAction<CartItem[]>>,
  category: string,
  setSubcategory: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
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
        product: {
          id: md[i].id,
          name: md[i].manufacturer + " " + md[i].model,
          brand: md[i].manufacturer,
          model: md[i].model,
          uploadedDate: md[i].uploaded_date,
          Description: md[i].descreption,
          price: md[i].price,
          Seller_name: md[i].seller_name,
          img_url: md[i].img_url,
          category: md[i].category,
        },
        quantity: 1,
      };
      switch (category) {
        case "": {
          addItem(item);
          break;
        }
        case "Category": {
          if (item.product.category === subcategory) addItem(item);
          break;
        }
        case "Price": {
          if (
            item.product.price >= parseInt(subcategory.split("-")[0]) &&
            item.product.price <= parseInt(subcategory.split("-")[1])
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
          setSubcategory("");
          break;
        }
        default: {
          setFilter_chooseSelect(
            <select
              ref={filterChooseRef}
              className={styles.filtersBarItem}
              name="filter choose"
              id="filter_choose"
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
            ></select>
          );
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory]);
}
export default useSetItemsCategory;
