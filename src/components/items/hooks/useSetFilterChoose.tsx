import { Dispatch, RefObject, useEffect } from "react";
import md from "../../../assets/MOCK_DATA.json";
import { CategoryEnum } from "../items";

function useSetFilterChoose(
  category: string,
  filterChooseRef: RefObject<HTMLSelectElement>,
  setSubcategory: Dispatch<React.SetStateAction<CategoryEnum>>,
  subcategory: string
) {
  useEffect(() => {
    if (filterChooseRef.current) {
      // TODO: remove this, this is react not js
      filterChooseRef.current.innerHTML = "";
    }
    const mySet = new Set<string>();
    if (category === "Category") {
      // TOOD: change this to map
      for (const i in md) mySet.add(md[i]["category"]);
    } else if (category === "Price") {
      for (let i = 0; i <= 3; i++) {
        const priceJump = 500;
        mySet.add(`${priceJump * i}-${priceJump * (1 + i)}`);
      }
    } else if (category === "Uploaded date") {
      // TODO: change to backtick string
      for (let i = 15; i <= 22; i++) mySet.add(`${1 / 1 / 20 + i}`);
    }
    mySet.forEach(function (value) {
      if (filterChooseRef.current) {
        filterChooseRef.current.innerHTML +=
          '<option value="' + value + '">' + value + "</option>";
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subcategory]);

  useEffect(() => {
    if (filterChooseRef.current) {
      filterChooseRef.current.innerHTML = "";
    }
    // TODO: use record instead or object
    if (category === "Category") {
      setSubcategory("Accessories");
    } else if (category === "Price") {
      setSubcategory("0-500");
    } else if (category === "Uploaded date") {
      setSubcategory("1/1/2015");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
}
export default useSetFilterChoose;
