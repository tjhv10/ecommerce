import React, { useState, useRef, ReactElement } from "react";
import styles from "./items.module.scss";
import Item, { ItemProps } from "../item/item.tsx";
import useSetItemsCategory from "./hooks/useSetItemsCategory.tsx";
import useSetFilterChoose from "./hooks/useSetFilterChoose";
import useSort from "./hooks/useSort.tsx";
import search from "./functions/search.tsx";
import md from "../../assets/MOCK_DATA.json";

interface CartItem {
  product: ItemProps;
  quantity: number;
}

export enum CategoryEnum {
  "No filter" = "No filter",
  "Category" = "Category",
  "Price" = "Price",
  "Uploaded date" = "Uploaded date",
}

const Items: React.FC = () => {
  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState<CategoryEnum>(
    CategoryEnum["No filter"]
  );
  const alli: CartItem[] = [];
  for (let i = 0; i < md.length; i++) {
    const item = {
      product: md[i],
      quantity: 1,
    };
    alli.push(item);
  }
  const [Items, setItems] = useState<CartItem[]>([]);
  const [sort, setSort] = useState<string>("");
  // TODO: change this to boolean instead
  const [filterChooseSelect, setFilterChooseSelect] = useState<ReactElement>();
  const filterChooseRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);
  const filterRef = useRef<HTMLSelectElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const addItem = (Item: CartItem) => {
    setItems((prevItems) => [...prevItems, Item]);
  };

  useSetItemsCategory(
    addItem,
    subcategory,
    setItems,
    category,
    setSubcategory,
    filterChooseRef,
    setFilterChooseSelect
  );
  useSort(Items, sort, setItems);
  useSetFilterChoose(category, filterChooseRef, setSubcategory, subcategory);

  return (
    <div className={styles.page}>
      <div className={styles.filtersBar}>
        <select
          className={styles.filtersBarItem}
          ref={filterRef}
          onChange={() => {
            if (filterRef.current) setCategory(filterRef.current.value);
          }}
        >
          {Object.values(CategoryEnum).map((filter) => (
            <option value={filter}>{filter}</option>
          ))}
        </select>
        {filterChooseSelect}
        <select
          ref={sortRef}
          className={styles.filtersBarItem}
          onChange={() => {
            if (sortRef.current) setSort(sortRef.current.value);
          }}
        >
          <option value="id">Sort...</option>
          <option value="price">Sort by price</option>
          <option value="date">Sort by uploaded date</option>
        </select>
        <div className={styles.filtersBarItem}>
          <input
            ref={searchRef}
            type="text"
            placeholder="Search..."
            onChange={() => {
              if (searchRef.current && searchRef.current.value === "") {
                setItems(alli);
              } else {
                if (searchRef.current)
                  search(
                    searchRef.current.value,
                    setItems,
                    Items,
                    setSort,
                    sortRef
                  );
              }
            }}
          ></input>
          <button
            onClick={() => {
              setItems(alli.slice());
              if (searchRef.current)
                search(
                  searchRef.current.value,
                  setItems,
                  Items,
                  setSort,
                  sortRef
                );
            }}
          >
            search
          </button>
        </div>
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
