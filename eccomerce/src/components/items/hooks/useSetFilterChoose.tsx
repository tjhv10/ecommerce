import { RefObject, SetStateAction, useEffect } from "react";
import md from "../../../assets/MOCK_DATA.json";

function useSetFilterChoose(
  category: string,
  filterChooseRef: RefObject<HTMLSelectElement>,
  setSubcategory: {
    (value: SetStateAction<string>): void;
    (arg0: string): void;
  },
  subcategory: string
) {
  useEffect(() => {
    if (filterChooseRef.current) {
      filterChooseRef.current.innerHTML = "";
    }
    const mySet = new Set<string>();
    if (category === "Category") {
      for (const i in md) mySet.add(md[i]["category"]);
    } else if (category === "Price") {
      for (let i = 0; i <= 3; i++)
        mySet.add((500 * i).toString() + "-" + (500 * (1 + i)).toString());
    } else if (category === "Uploaded date") {
      for (let i = 15; i <= 22; i++) mySet.add("1/1/20" + i.toString());
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
