import React, { useEffect, useRef, useState } from "react";
import styles from "./items.module.scss";
import Item, { ItemProps } from "../Item/item.tsx";
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
  const { data, loading } = useGetItems();

  useEffect(() => {
    if (data) {
      let allItems: CartItem[] = [];
      for (let i = 0; i < data.length; i++) {
        const item: CartItem = {
          product: data[i],
          quantity: 1,
          buttons: new Map<ButtonsEnum, boolean>([[ButtonsEnum.AddToCartAndGoToItemPage, true]]),
        };
        allItems.push(item);
      }
      allItems = allItems.slice().sort((a: CartItem, b: CartItem) => a.product.id - b.product.id);
      setItems(allItems);
    }
  }, [data]);

  const addItem = (Item: CartItem) => {
    setItems((prevItems) => [...prevItems, Item]);
  };

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue) && newValue.length === 2) {
      const [lowPrice, highPrice] = newValue;
      setPriceRange(newValue);
      setItems([]);
      for (const item of Items) {
        if (item.product.price >= lowPrice && item.product.price <= highPrice) {
          addItem(item);
        } else {
          console.log(`Item with price ${item.product.price} is out of range.`);
        }
      }
    }
  };

  function valuetext(value: number) {
    return `${value}$`;
  }

  useSort(sort, setItems);

  if (loading) return "Loading...";

  return (
    <div className={styles.page}>
      <div className={styles.filtersBar}>
        <input
          type="text"
          placeholder="Search..."
          className={styles.search}
          onChange={(e) => {
            if (e.target.value === "") {
              setItems(data);
              if (selectSortRef.current) {
                selectSortRef.current.selectedIndex = 0;
                selectSortRef.current.value = SortEnum.id;
                setSort(SortEnum.id);
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
            setItems([]);
            for (const item of data) {
              if (
                e.currentTarget.value === "All" ||
                item.product.categories.some(
                  (category: ItemProps) => category.name === e.currentTarget.value
                )
              ) {
                addItem(item);
              }
              // } else {
              //   console.log(
              //     `Item with category ${item.product.categories
              //       .map((c) => c.name)
              //       .join(", ")} does not match the filter.`
              //   );
              // }
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
            setItems([]);
            for (const item of data) {
              if (
                e.currentTarget.value === "All Dates" ||
                Date.parse(item.product.uploadDate) >= Date.parse(e.currentTarget.value)
              ) {
                addItem(item);
              } else {
                console.log(
                  `Item with upload date ${item.product.uploadDate} does not match the filter.`
                );
              }
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
