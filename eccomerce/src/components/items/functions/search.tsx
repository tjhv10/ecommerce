import { SetStateAction, RefObject, Dispatch } from "react";
import { ItemProps } from "../../item/item";

const search = (
  phrase: string,
  setItems: Dispatch<React.SetStateAction<ItemProps[]>>,
  alli: ItemProps[],
  Items: ItemProps[],
  setSort: { (value: SetStateAction<string>): void; (arg0: string): void },
  sortRef: RefObject<HTMLSelectElement>
) => {
  if (phrase === "") {
    setItems(alli);
    return;
  }
  console.log(Items);
  const result = Items.filter(
    (item: { name: string; category: string; model: string; brand: string }) =>
      item.name.toLowerCase() === phrase.toLowerCase().trim() ||
      item.category.toLowerCase() === phrase.toLowerCase().trim() ||
      item.model.toLowerCase() === phrase.toLowerCase().trim() ||
      item.brand.toLowerCase() === phrase.toLowerCase().trim()
  );
  setItems(result);
  setSort("id");
  if (sortRef.current) sortRef.current.selectedIndex = 0;
};
export default search;
