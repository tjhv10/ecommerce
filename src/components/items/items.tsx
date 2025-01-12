import React, { useRef, useState } from "react";
import styles from "./items.module.scss";
import Item from "../Item/item.tsx";
import useSort, { SortEnum } from "./hooks/useSort.tsx";
import searchFunction from "./functions/searchFunction.tsx";
import { ButtonsEnum, CartItem } from "../../Store/shopping-cart-context.tsx";
import { useGetItems } from "../../fetchDataQueries/useGetItems.tsx";
import { Slider } from "@mui/material";
import { CategoryEnum, DateEnum } from "./enums.tsx";

const Items: React.FC = () => {
  const [priceRange, setPriceRange] = useState<number[]>([0, 2000]);
  const [Items, setItems] = useState<CartItem[]>([]);

  const [sort, setSort] = useState<SortEnum>(SortEnum.id);
  const selectSortRef = useRef<HTMLSelectElement>(null);
  const selectFilterRef = useRef<HTMLSelectElement>(null);
  const addItem = (Item: CartItem) => {
    setItems((prevItems) => [...prevItems, Item]);
  };
  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      const [lowPrice, highPrice] = newValue;
      setPriceRange(newValue);
      for (const item of Items) {
        if (item.product.price >= lowPrice && item.product.price <= highPrice) addItem(item);
      }
    }
  };
  function valuetext(value: number) {
    return `${value}$`;
  }
  useSort(sort, setItems);
  const { data, loading } = useGetItems();
  if (loading) return "Loading...";
  let alli: CartItem[] = [];
  for (let i = 0; i < data.length; i++) {
    const item: CartItem = {
      product: data[i],
      quantity: 1,
      buttons: new Map<ButtonsEnum, boolean>([[ButtonsEnum.AddToCartAndGoToItemPage, true]]),
    };
    alli.push(item);
  }

  alli = alli.slice().sort((a: CartItem, b: CartItem) => a.product.id - b.product.id);

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
                selectFilterRef.current.selectedIndex = 0;
              }
            } else {
              searchFunction(e.target.value, setItems, Items, setSort);
            }
          }}
        />
        Category:
        <select
          className={styles.filtersBarItem}
          onChange={(e) => {
            for (const item of Items) {
              if (
                e.currentTarget.value === "All" ||
                item.product.categories.some((category) => category.name === e.currentTarget.value)
              ) {
                addItem(item);
              }
            }
          }}>
          {Array.from(new Set(Object.values(CategoryEnum))).map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        Uploaded date from:
        <select
          className={styles.filtersBarItem}
          onChange={(e) => {
            for (const item of Items) {
              if (
                e.currentTarget.value === "All Dates" ||
                Date.parse(item.product.uploadDate) >= Date.parse(e.currentTarget.value)
              )
                addItem(item);
            }
          }}>
          {Array.from(new Set(Object.values(DateEnum))).map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        Price range:
        <Slider
          getAriaLabel={() => "Price range"}
          value={priceRange}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          className={styles.filtersBarItemPrice}
          min={0}
          max={2000}
        />
        <select
          ref={selectSortRef}
          className={styles.filtersBarItem}
          onChange={(e) => {
            setSort(SortEnum[e.currentTarget.value as SortEnum]);
          }}>
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
