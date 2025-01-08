import React, { useState } from "react";
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
// import md from "../../assets/MOCK_DATA.json";
import searchFunction from "./functions/searchFunction.tsx";

import { ButtonsEnum, CartItem } from "../../Store/shopping-cart-context.tsx";
import { gql, useQuery } from "@apollo/client";
const GET_ITEMS = gql`
  query {
    getItems {
      id
      name
      price
      uploadDate
      description
      sellerName
      status
      imageUrl
      categories {
        name
      }
    }
  }
`;

const Items: React.FC = () => {
  const [category, setCategory] = useState<CategoryEnum>(
    CategoryEnum["No filter"]
  );
  const [subcategory, setSubcategory] = useState<
    subcategoryEnum | number[] | DateEnum
  >();
  const [Items, setItems] = useState<CartItem[]>([]);

  const [sort, setSort] = useState<SortEnum>(SortEnum.id);
  const options = useSetFilterChoose(category, subcategory, setSubcategory);
  const addItem = (Item: CartItem) => {
    setItems((prevItems) => [...prevItems, Item]);
  };
  useSort(sort, setItems);
  const { loading, error, data } = useQuery(GET_ITEMS);

  useSetItemsCategory(
    data,
    addItem,
    subcategory,
    setItems,
    category,
    setSubcategory,
    loading
  );

  if (loading) {
    return "Loading...";
  }
  if (error) return `Error! ${error.message}`;
  const dataa = data.getItems;
  const alli: CartItem[] = [];
  for (let i = 0; i < 0; i++) {
    const item: CartItem = {
      product: dataa[i],
      quantity: 1,
      buttons: new Map<ButtonsEnum, boolean>([
        [ButtonsEnum.AddToCartAndGoToItemPage, true],
      ]),
    };

    alli.push(item);
  }

  if (Items.length == 0) return "Loading...";
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
            } else {
              searchFunction(e.target.value, setItems, alli, setSort);
            }
          }}
        />
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
        {category !== CategoryEnum["No filter"] ? options : null}
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
