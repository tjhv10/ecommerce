import React, { useState } from "react";
import styles from "./items.module.scss";
import Item from "../Item/item.tsx";
import { ButtonsEnum, CartItem } from "../../Store/shopping-cart-context.tsx";
import { useGetItems } from "../../fetchDataQueries/useGetItems.tsx";
import { DateEnum, SortEnum, SubCategoryEnum } from "./enums.tsx";
import useFilters from "./hooks/useFilters.tsx";
import { Slider } from "@mui/material";

const Items: React.FC = () => {
  const [price, setPrice] = useState<number[]>([0, 2000]);
  const [subcategory, setSubcategory] = useState<SubCategoryEnum>(SubCategoryEnum.All);
  const [date, setDate] = useState<DateEnum>(DateEnum["All dates"]);
  const [Items, setItems] = useState<CartItem[]>([]);
  const [sort, setSort] = useState<SortEnum>(SortEnum.Id);
  const [searchPhrase, setSearchPhrase] = useState<string>("");

  function valuetext(value: number) {
    return `${value}$`;
  }

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPrice(newValue);
    }
  };

  const { data, loading } = useGetItems();

  useFilters(data, subcategory, setItems, loading, date, price, sort, searchPhrase);

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
            setSearchPhrase(e.currentTarget.value);
          }}
        />
        <select
          className={styles.filtersBarItem}
          onChange={(e) => {
            setSubcategory(e.currentTarget.value as SubCategoryEnum);
          }}>
          {Array.from(Object.values(SubCategoryEnum)).map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <select
          className={styles.filtersBarItem}
          onChange={(e) => {
            setDate(e.currentTarget.value as DateEnum);
          }}>
          {Array.from(Object.values(DateEnum)).map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <Slider
          getAriaLabel={() => "Price range"}
          value={price}
          onChange={handleChange}
          valueLabelDisplay="auto"
          getAriaValueText={valuetext}
          className={styles.filtersBarItemPrice}
          min={0}
          max={2000}
        />
        Sort:
        <select
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
