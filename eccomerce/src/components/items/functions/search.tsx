import { SetStateAction, RefObject, Dispatch } from "react";
import { ItemProps } from "../../item/item";

const search = (
  phrase: string,
  setItems: Dispatch<React.SetStateAction<ItemProps[]>>,
  Items: ItemProps[],
  setSort: { (value: SetStateAction<string>): void; (arg0: string): void },
  sortRef: RefObject<HTMLSelectElement>
) => {
  const result = Items.filter(
    (item: { name: string; category: string; model: string; brand: string }) =>
      item.name.toLowerCase().substring(0, phrase.length) ===
        phrase.toLowerCase().trim() ||
      item.category.toLowerCase().substring(0, phrase.length) ===
        phrase.toLowerCase().trim() ||
      item.model.toLowerCase().substring(0, phrase.length) ===
        phrase.toLowerCase().trim() ||
      item.brand.toLowerCase().substring(0, phrase.length) ===
        phrase.toLowerCase().trim()
  );
  setItems(result);
  setSort("id");
  if (sortRef.current) sortRef.current.selectedIndex = 0;
};
export default search;
