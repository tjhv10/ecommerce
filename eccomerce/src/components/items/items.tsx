import React, { useState, useRef, ReactElement } from "react";
import styles from "./items.module.scss";
import Item, { ItemProps } from "../item/item.tsx";
import useSetItemsCategory from "./hooks/useSetItemsCategory.tsx";
import useInitAllItems from "./hooks/useInitAllItems.tsx";
import useSetFilterChoose from "./hooks/useSetFilterChoose";
import useSort from "./hooks/useSort.tsx";
import Search from "./functions/search.tsx";

const Items: React.FC = () => {
  const alli: ItemProps[] = [];

  const [category, setCategory] = useState<string>("");
  const [subcategory, setSubcategory] = useState("");
  const [Items, setItems] = useState<ItemProps[]>(alli);
  const [sort, setSort] = useState<string>("");
  const [filter_chooseSelect, setFilter_chooseSelect] =
    useState<ReactElement>();
  const filterChooseRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);
  const filterRef = useRef<HTMLSelectElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const addItem = (Item: ItemProps) => {
    setItems((prevItems) => [...prevItems, Item]);
  };
  useInitAllItems(alli);
  useSetItemsCategory(
    addItem,
    subcategory,
    setItems,
    category,
    setSubcategory,
    filterChooseRef,
    setFilter_chooseSelect
  );
  useSort(Items, sort, setItems);
  useSetFilterChoose(category, filterChooseRef, setSubcategory, subcategory);

  return (
    <div className={styles.page}>
      <div className={styles.filtersBar}>
        <select
          className={styles.filtersBarItem}
          ref={filterRef}
          name="filter"
          id="filter"
          onChange={() => {
            if (filterRef.current) setCategory(filterRef.current.value);
          }}
        >
          <option value="">No filter</option>
          <option value="Category">Category</option>
          <option value="Price">Price</option>
          <option value="Uploaded date">Uploaded date</option>
        </select>
        {filter_chooseSelect}
        <select
          ref={sortRef}
          className={styles.filtersBarItem}
          name="sort"
          id="sort"
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
            id="search"
            type="text"
            placeholder="Search..."
            onChange={() => {
              if (searchRef.current && searchRef.current.value === "") {
                setItems(alli);
              }
            }}
          ></input>
          <button
            onClick={() => {
              setItems(alli.slice());
              if (searchRef.current)
                Search(
                  searchRef.current.value,
                  setItems,
                  alli,
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
          <Item key={item.id} props={item} />
        ))}
      </div>
    </div>
  );
};

export default Items;
