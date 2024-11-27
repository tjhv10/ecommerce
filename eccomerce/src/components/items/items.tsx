import React, { useState, useEffect } from "react";
import styles from "./items.module.scss";
import Item, { ItemProps } from "../item/item.tsx";
import md from "../../assets/MOCK_DATA.json";

const Items: React.FC = () => {
  const [Items, setItems] = useState<ItemProps[]>([]);
  const [category, setCategory] = useState<string>("");
  const [value, setValue] = useState("");

  const addItem = (Item: ItemProps) => {
    setItems((prevItems) => [...prevItems, Item]);
  };

  useEffect(() => {
    setItems([]);
    for (const i in md) {
      const firstItem: ItemProps = {
        id: md[i].id,
        itemName: md[i].manufacturer + " " + md[i].model,
        uploadedDate: md[i].uploaded_date,
        Description: md[i].descreption,
        price: md[i].price,
        Seller_name: md[i].seller_name,
        img_url: md[i].img_url,
        category: md[i].category,
      };
      switch (category) {
        case "": {
          addItem(firstItem);
          break;
        }
        case "Category": {
          if (firstItem.category === value) addItem(firstItem);
          break;
        }
        case "Price": {
          if (
            firstItem.price >= parseInt(value.split("-")[0]) &&
            firstItem.price <= parseInt(value.split("-")[1])
          )
            addItem(firstItem);
          break;
        }
        case "Uploaded date": {
          if (Date.parse(firstItem.uploadedDate) >= Date.parse(value))
            addItem(firstItem);
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
      mySet.forEach(function (value) {
        document.getElementById("filter_choose")!.innerHTML =
          document.getElementById("filter_choose")?.innerHTML +
          "<option value='" +
          value +
          "'>" +
          value +
          "</option>";
      });
    } else if (category === "Price") {
      setValue("0-500");
      for (let i = 0; i <= 3; i++)
        mySet.add((500 * i).toString() + "-" + (500 * (1 + i)).toString());
      mySet.forEach(function (value) {
        document.getElementById("filter_choose")!.innerHTML =
          document.getElementById("filter_choose")?.innerHTML +
          '<option value="' +
          value +
          '">' +
          value +
          "</option>";
      });
    } else if (category === "Uploaded date") {
      setValue("1/1/2000");
      for (let i = 15; i <= 22; i++) mySet.add("1/1/20" + i.toString());
      mySet.forEach(function (value) {
        document.getElementById("filter_choose")!.innerHTML =
          document.getElementById("filter_choose")?.innerHTML +
          '<option value="' +
          value +
          '">' +
          value +
          " and later</option>";
      });
    }
  }, [category]);

  const renderItems = () =>
    Items.map((item) => (
      <Item
        key={item.id}
        id={item.id}
        itemName={item.itemName}
        uploadedDate={item.uploadedDate}
        Description={item.Description}
        price={item.price}
        Seller_name={item.Seller_name}
        img_url={item.img_url}
        category={item.category}
      />
    ));

  return (
    <div>
      <select
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
            (document.getElementById("filter_choose")!.style.display = "block")
          }
        >
          No filter
        </option>
        <option value="Category">Category</option>
        <option value="Price">Price</option>
        <option value="Uploaded date">Uploaded date</option>
      </select>
      <select
        name="filter choose"
        id="filter_choose"
        onChange={() => {
          const e = document.getElementById(
            "filter_choose"
          ) as HTMLSelectElement;
          setValue(e.options[e.selectedIndex].value);
        }}
      ></select>
      <input type="text" placeholder="Search..."></input>
      <button>search</button>
      <div className={styles.content}>{renderItems()}</div>
    </div>
  );
};

export default Items;
