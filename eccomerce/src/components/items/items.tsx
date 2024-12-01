import React, { useState, useEffect } from "react";
import styles from "./items.module.scss";
import Item, { ItemProps } from "../item/item.tsx";
import md from "../../assets/MOCK_DATA.json";

const Items: React.FC = () => {
  const alli: ItemProps[] | (() => ItemProps[]) = [];
  const [category, setCategory] = useState<string>("");
  const [value, setValue] = useState("");
  const [Items, setItems] = useState<ItemProps[]>(alli);
  const addItem = (Item: ItemProps) => {
    setItems((prevItems) => [...prevItems, Item]);
  };
  useEffect(() => {
    for (let i = 0; i < md.length; i++) {
      const item: ItemProps = {
        id: md[i].id,
        name: md[i].manufacturer + " " + md[i].model,
        brand: md[i].manufacturer,
        model: md[i].model,
        uploadedDate: md[i].uploaded_date,
        Description: md[i].descreption,
        price: md[i].price,
        Seller_name: md[i].seller_name,
        img_url: md[i].img_url,
        category: md[i].category,
      };
      alli.push(item);
    }
  });

  useEffect(() => {
    setItems([]);
    for (const i in md) {
      const item: ItemProps = {
        id: md[i].id,
        name: md[i].manufacturer + " " + md[i].model,
        brand: md[i].manufacturer,
        model: md[i].model,
        uploadedDate: md[i].uploaded_date,
        Description: md[i].descreption,
        price: md[i].price,
        Seller_name: md[i].seller_name,
        img_url: md[i].img_url,
        category: md[i].category,
      };
      switch (category) {
        case "": {
          addItem(item);
          break;
        }
        case "Category": {
          if (item.category === value) addItem(item);
          break;
        }
        case "Price": {
          if (
            item.price >= parseInt(value.split("-")[0]) &&
            item.price <= parseInt(value.split("-")[1])
          )
            addItem(item);
          break;
        }
        case "Uploaded date": {
          if (Date.parse(item.uploadedDate) >= Date.parse(value)) addItem(item);
          break;
        }
      }
    }
  }, [category, value]);

  useEffect(() => {
    document.getElementById("filter_choose")!.innerHTML = "";
    const mySet = new Set<string>();
    if (category === "Category") {
      setValue("Accessories");
      for (const i in md) mySet.add(md[i]["category"]);
    } else if (category === "Price") {
      setValue("0-500");
      for (let i = 0; i <= 3; i++)
        mySet.add((500 * i).toString() + "-" + (500 * (1 + i)).toString());
    } else if (category === "Uploaded date") {
      setValue("1/1/2015");
      for (let i = 15; i <= 22; i++) mySet.add("1/1/20" + i.toString());
    }
    mySet.forEach(function (value) {
      document.getElementById("filter_choose")!.innerHTML =
        document.getElementById("filter_choose")?.innerHTML +
        '<option value="' +
        value +
        '">' +
        value +
        "</option>";
    });
  }, [category]);

  const search = (phrase: string) => {
    if (phrase === "") {
      setItems(alli);
      return;
    }

    const result = Items.filter(
      (item) =>
        item.name.toLowerCase() === phrase.toLowerCase().trim() ||
        item.category.toLowerCase() === phrase.toLowerCase().trim() ||
        item.model.toLowerCase() === phrase.toLowerCase().trim() ||
        item.brand.toLowerCase() === phrase.toLowerCase().trim()
    );
    setItems(result);
  };

  const renderItems = (Items: ItemProps[]) =>
    Items.map((item) => <Item props={item} />);

  return (
    <div className={styles.page}>
      <div className={styles.filtersBar}>
        <select
          className={styles.filtersBarItem}
          name="filter"
          id="filter"
          onChange={() => {
            const e = document.getElementById("filter") as HTMLSelectElement;
            setCategory(e.options[e.selectedIndex].value);
          }}
        >
          <option
            value=""
            onSelect={() =>
              (document.getElementById("filter_choose")!.style.display = "none")
            }
          >
            No filter
          </option>
          <option value="Category">Category</option>
          <option value="Price">Price</option>
          <option value="Uploaded date">Uploaded date</option>
        </select>
        <select
          className={styles.filtersBarItem}
          name="filter choose"
          id="filter_choose"
          onChange={() => {
            const e = document.getElementById(
              "filter_choose"
            ) as HTMLSelectElement;
            setValue(e.options[e.selectedIndex].value);
          }}
        ></select>
        <div className={styles.filtersBarItem}>
          <input id="search" type="text" placeholder="Search..."></input>
          <button
            onClick={() => {
              const inputElement = document.getElementById(
                "search"
              ) as HTMLInputElement;
              search(inputElement.value);
            }}
          >
            search
          </button>
        </div>
      </div>
      <div className={styles.content}>{renderItems(Items)}</div>
    </div>
  );
};

export default Items;
