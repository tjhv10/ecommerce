import React, { useRef, useState } from "react";
import styles from "./items.module.scss";
import Item from "../Item/item.tsx";
import useSetItemsCategory, {
  CategoryEnum,
} from "./hooks/useSetItemsCategory.tsx";
import useSetFilterChoose, {
  subcategoryEnum,
  DateEnum,
} from "./hooks/useSetFilterChoose.tsx";
import useSort, { SortEnum } from "./hooks/useSort.tsx";
import searchFunction from "./functions/searchFunction.tsx";

import { ButtonsEnum, CartItem } from "../../Store/shopping-cart-context.tsx";
import { useGetItems } from "../../fetchDataQueries/useGetItems.tsx";

const Items: React.FC = () => {
  const [category, setCategory] = useState<CategoryEnum>(
    CategoryEnum["No filter"]
  );
  const [subcategory, setSubcategory] = useState<
    subcategoryEnum | number[] | DateEnum
  >();
  const [Items, setItems] = useState<CartItem[]>([]);

  const [sort, setSort] = useState<SortEnum>(SortEnum.id);
  const selectSortRef = useRef<HTMLSelectElement>(null);
  const selectFilterRef = useRef<HTMLSelectElement>(null);
  const options = useSetFilterChoose(category, subcategory, setSubcategory);
  const addItem = (Item: CartItem) => {
    setItems((prevItems) => [...prevItems, Item]);
  };
  useSort(sort, setItems);
  const { data, loading } = useGetItems();

  useSetItemsCategory(
    data,
    addItem,
    subcategory,
    setItems,
    category,
    setSubcategory,
    loading
  );
  if (loading) return "Loading...";
  console.log(data);

  let alli: CartItem[] = [];
  for (let i = 0; i < data.length; i++) {
    const item: CartItem = {
      product: data[i],
      quantity: 1,
      buttons: new Map<ButtonsEnum, boolean>([
        [ButtonsEnum.AddToCartAndGoToItemPage, true],
      ]),
    };
    alli.push(item);
  }

  alli = alli
    .slice()
    .sort((a: CartItem, b: CartItem) => a.product.id - b.product.id);

  return (
    <div className={styles.page}>
      <div className={styles.filtersBar}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.search}
          onChange={(e) => {
            if (e.target.value === "") {
              setItems(alli);
              if (selectSortRef.current) {
                selectSortRef.current.selectedIndex = 0;
                selectSortRef.current.value = SortEnum.id;
                setSort(SortEnum.id);
              }
              if (selectFilterRef.current) {
                selectFilterRef.current.value = CategoryEnum["No filter"];
                setCategory(CategoryEnum["No filter"]);
                selectFilterRef.current.selectedIndex = 0;
              }
            } else {
              searchFunction(e.target.value, setItems, Items, setSort);
            }
          }}
        />
        <select
          ref={selectFilterRef}
          className={styles.filtersBarItem}
          onChange={(e) =>
            setCategory(
              CategoryEnum[e.target.value as keyof typeof CategoryEnum]
            )
          }
        >
          {Object.values(CategoryEnum).map((filter) => (
            <option value={filter} key={filter}>
              {filter}
            </option>
          ))}
        </select>
        {category !== CategoryEnum["No filter"] ? options : null}
        <select
          ref={selectSortRef}
          className={styles.filtersBarItem}
          onChange={(e) => {
            setSort(SortEnum[e.currentTarget.value as SortEnum]);
          }}
        >
          <option value="id">Sort...</option>
          <option value="price">Sort by price</option>
          <option value="date">Sort by uploaded date</option>
        </select>
      </div>
      <div className={styles.content}>
        {Items.map((item) => (
          <Item key={item.product.id} props={item} />
        ))}
      </div>
    </div>
  );
};

export default Items;
