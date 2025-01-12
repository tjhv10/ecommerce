/* eslint-disable react-hooks/exhaustive-deps */
import { Dispatch, SetStateAction, useEffect } from "react";
import { ButtonsEnum, CartItem } from "../../../Store/shopping-cart-context";
import { DateEnum, SortEnum, SubCategoryEnum } from "../enums";
import { ItemProps } from "../../Item/item";

function useSetItemsCategory(
  data: ItemProps[],
  subcategory: SubCategoryEnum | DateEnum | number[] | undefined,
  setItems: Dispatch<SetStateAction<CartItem[]>>,
  loading: boolean,
  date: string,
  price: number[],
  sort: SortEnum
) {
  const addItem = (Item: CartItem) => {
    setItems((prevItems) => [...prevItems, Item]);
  };
  const sorts = new Map([
    [
      SortEnum.date,
      (items: ItemProps[]) =>
        items.slice().sort((a, b) => Date.parse(a.uploadDate) - Date.parse(b.uploadDate)),
    ],
    [SortEnum.id, (items: ItemProps[]) => items.slice().sort((a, b) => a.id - b.id)],
    [SortEnum.price, (items: ItemProps[]) => items.slice().sort((a, b) => a.price - b.price)],
  ]);
  const getSortedItems = (sortEnum: SortEnum, items: ItemProps[]) => {
    const sortFunction = sorts.get(sortEnum);
    return sortFunction ? sortFunction(items) : items;
  };
  useEffect(() => {
    if (loading) {
      return;
    }
    const sortedItems = getSortedItems(sort, data);
    setItems([]);
    const [lowPrice, highPrice] = price;
    for (const sortedItem of sortedItems) {
      if (
        (subcategory === "All" ||
          sortedItem.categories.some((category) => category.name === subcategory)) &&
        sortedItem.price >= lowPrice &&
        sortedItem.price <= highPrice &&
        (date === "All dates" || Date.parse(sortedItem.uploadDate) >= Date.parse(date!))
      ) {
        const item: CartItem = {
          product: sortedItem,
          quantity: 1,
          buttons: new Map<ButtonsEnum, boolean>([[ButtonsEnum.AddToCartAndGoToItemPage, true]]),
        };
        addItem(item);
      }
    }
  }, [loading, subcategory, price, date, sort]);
}

export default useSetItemsCategory;
