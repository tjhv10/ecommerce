import { Dispatch, SetStateAction, useEffect } from "react";
import md from "../../../assets/MOCK_DATA.json";
import { ButtonsEnum, CartItem } from "../../../Store/shopping-cart-context";
import { subcategoryEnum, DateEnum } from "./useSetFilterChoose";
export enum CategoryEnum {
  "No filter" = "No filter",
  "Category" = "Category",
  "Uploaded date" = "Uploaded date",
  "Price" = "Price",
}
function useSetItemsCategory(
  addItem: (item: CartItem) => void,
  subcategory: subcategoryEnum | DateEnum | number[] | undefined,
  setItems: Dispatch<SetStateAction<CartItem[]>>,
  category: string,
  setSubcategory: Dispatch<subcategoryEnum | DateEnum | number[] | undefined>
) {
  useEffect(() => {
    setItems([]);
    for (const i in md) {
      const item: CartItem = {
        product: md[i],
        quantity: 1,
        buttons: new Map<ButtonsEnum, boolean>([
          [ButtonsEnum.AddToCartAndGoToItemPage, true],
        ]),
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
          if (Array.isArray(subcategory) && subcategory.length === 2) {
            const [lowPrice, highPrice] = subcategory;
            if (
              item.product.price >= lowPrice &&
              item.product.price <= highPrice
            )
              addItem(item);
          }
          break;
        }
        case CategoryEnum["Uploaded date"]: {
          if (
            typeof subcategory === "string" &&
            Date.parse(item.product.uploadedDate) >= Date.parse(subcategory!)
          )
            addItem(item);
          break;
        }
      }
      switch (category) {
        case CategoryEnum["No filter"]: {
          setSubcategory(
            subcategoryEnum["No filter" as keyof typeof subcategoryEnum]
          );
          break;
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory]);
}

export default useSetItemsCategory;
