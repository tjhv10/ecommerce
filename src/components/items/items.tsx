import React, { useState } from "react";
import styles from "./items.module.scss";
import Item from "../Item/item.tsx";
import { CartItem } from "../../Store/shopping-cart-context.tsx";
import { useGetItems } from "../../fetchDataQueries/useGetItems.tsx";
import { DateEnum, SortEnum, SubCategoryEnum } from "./enums.tsx";
import useItemFiltering from "./hooks/useItemFiltering.tsx";
import { Slider } from "@mui/material";

const Items: React.FC = () => {
  const [price, setPrice] = useState<number[]>([0, 2000]);
  const [subcategory, setSubcategory] = useState<SubCategoryEnum>(SubCategoryEnum.All);
  const [date, setDate] = useState<DateEnum>(DateEnum["All dates"]);
  const [Items, setItems] = useState<CartItem[]>([]);
  const [sort, setSort] = useState<SortEnum>(SortEnum.Id);
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const { data, loading } = useGetItems();
  const sortMap: { [key: string]: SortEnum } = {
    id: SortEnum.Id,
    price: SortEnum.Price,
    date: SortEnum.Date,
  };

  function valuetext(value: number) {
    return `${value}$`;
  }

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setPrice(newValue);
    }
  };

  useItemFiltering(data, subcategory, setItems, loading, date, price, sort, searchPhrase);

  if (loading) return "Loading...";
  return (
    <div className={styles.page}>
      <div className={styles.filtersBar}>
        Search:
        <input
          type="text"
          placeholder="Search..."
          className={styles.search}
          onChange={(e) => {
            setSearchPhrase(e.currentTarget.value);
          }}
        />
        Category:
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
        Uploaded date from:
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
        Price:
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
            setSort(sortMap[e.currentTarget.value as SortEnum]);
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
