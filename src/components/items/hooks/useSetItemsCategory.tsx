import { Dispatch, SetStateAction, useEffect } from "react";
import md from "../../../assets/MOCK_DATA.json";
import { ButtonsEnum, CartItem } from "../../../Store/shopping-cart-context";
import { subcategoryEnum, DateEnum, PriceEnum } from "./useSetFilterChoose";
enum CategoryEnum {
  "No filter" = "No filter",
  "Category" = "Category",
  "Uploaded date" = "Uploaded date",
  "Price" = "Price",
}
function useSetItemsCategory(
  addItem: (item: CartItem) => void,
  subcategory: subcategoryEnum | DateEnum | PriceEnum | undefined,
  setItems: Dispatch<SetStateAction<CartItem[]>>,
  category: string,
  setSubcategory: Dispatch<subcategoryEnum | DateEnum | PriceEnum | undefined>
) {
  useEffect(() => {
    setItems([]);
    for (const i in md) {
      const item: CartItem = {
        product: md[i],
        quantity: 1,
        buttons: new Map<ButtonsEnum, boolean>([
          [ButtonsEnum.AddToCart, true],
          [ButtonsEnum.PlusMinus, false],
          [ButtonsEnum.Remove, false],
        ]),
      };
      switch (category) {
        case CategoryEnum["No filter"]: {
          addItem(item);
          break;
        }
        case CategoryEnum["Category"]: {
          console.log(subcategory);

          if (item.product.category === subcategory) {
            addItem(item);
          }
          break;
        }
        case CategoryEnum["Price"]: {
          if (subcategory) {
            const [lowPrice, highPrice] = subcategory!.split("-");
            if (
              item.product.price >= parseInt(lowPrice) &&
              item.product.price <= parseInt(highPrice)
            )
              addItem(item);
          }
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
