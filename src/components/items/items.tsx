import React, { useState, useRef, ReactElement } from "react";
import styles from "./items.module.scss";
import Item, { ItemProps } from "../Item/Item.tsx";
import useSetItemsCategory from "./hooks/useSetItemsCategory.tsx";
import useSetFilterChoose, {
  subcategoryEnum,
} from "./hooks/useSetFilterChoose.tsx";
import useSort from "./hooks/useSort.tsx";
import md from "../../assets/MOCK_DATA.json";
import searchFunction from "./functions/searchFunction.tsx";

export interface CartItem {
  product: ItemProps;
  quantity: number;
}
enum CategoryEnum {
  "No filter" = "No filter",
  "Category" = "Category",
  "Uploaded date" = "Uploaded date",
  "Price" = "Price",
}

const Items: React.FC = () => {
  const alli: CartItem[] = [];
  for (let i = 0; i < md.length; i++) {
    const item = {
      product: md[i],
      quantity: 1,
    };
    alli.push(item);
  }
  const [category, setCategory] = useState<CategoryEnum>(
    CategoryEnum["No filter"]
  );
  const [subcategory, setSubcategory] = useState<subcategoryEnum>(
    subcategoryEnum.Accessories
  );
  const [Items, setItems] = useState<CartItem[]>([]);
  const [sort, setSort] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filterChooseSelect, setFilterChooseSelect] = useState<ReactElement>();
  const filterChooseRef = useRef<HTMLSelectElement>(null);
  const sortRef = useRef<HTMLSelectElement>(null);

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
            type="text"
            placeholder="Search..."
            onChange={(e) => {
              setSearch(e.target.value);
              if (search === "" || search.length === 1) {
                setItems(alli);
              } else {
                searchFunction(search, setItems, Items, setSort, sortRef);
              }
            }}
          ></input>
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
