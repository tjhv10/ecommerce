import React, { useState } from "react";
import styles from "./items.module.scss";
import Item from "../Item/Item.tsx";
import useSetItemsCategory, {
  CategoryEnum,
} from "./hooks/useSetItemsCategory.tsx";
import useSetFilterChoose, {
  subcategoryEnum,
  PriceEnum,
  DateEnum,
} from "./hooks/useSetFilterChoose.tsx";
import useSort, { SortEnum } from "./hooks/useSort.tsx";
import md from "../../assets/MOCK_DATA.json";
import searchFunction from "./functions/searchFunction.tsx";

import { ButtonsEnum, CartItem } from "../../Store/shopping-cart-context.tsx";

const Items: React.FC = () => {
  const alli: CartItem[] = [];
  for (let i = 0; i < md.length; i++) {
    const item = {
      product: md[i],
      quantity: 1,
      buttons: new Map<ButtonsEnum, boolean>([
        [ButtonsEnum.AddToCart, true],
        [ButtonsEnum.PlusMinus, false],
        [ButtonsEnum.Remove, false],
      ]),
    };
    alli.push(item);
  }

  const [category, setCategory] = useState<CategoryEnum>(
    CategoryEnum["No filter"]
  );
  const [subcategory, setSubcategory] = useState<
    subcategoryEnum | PriceEnum | DateEnum
  >();
  const [Items, setItems] = useState<CartItem[]>([]);
  const [sort, setSort] = useState<SortEnum>(SortEnum.id);
  const [search, setSearch] = useState<string>("");
  const options = useSetFilterChoose(category, setSubcategory);

  const addItem = (Item: CartItem) => {
    setItems((prevItems) => [...prevItems, Item]);
  };

  useSetItemsCategory(addItem, subcategory, setItems, category, setSubcategory);
  useSort(sort, setItems);

  return (
    <div className={styles.page}>
      <div className={styles.filtersBar}>
        <div className={styles.filtersBarItem}>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
              if (search === "" || search.length === 1) {
                setItems(alli);
              } else {
                searchFunction(search, setItems, Items, setSort);
              }
            }}
          />
        </div>
        <select
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
        {category !== CategoryEnum["No filter"] ? (
          <select
            className={styles.filtersBarItem}
            onChange={(e) =>
              setSubcategory(
                category === "Category"
                  ? subcategoryEnum[
                      e.target.value as keyof typeof subcategoryEnum
                    ]
                  : category === "Price"
                  ? PriceEnum[e.target.value as keyof typeof PriceEnum]
                  : DateEnum[e.target.value as keyof typeof DateEnum]
              )
            }
            value={subcategory}
          >
            {options.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        ) : null}
        <select
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
