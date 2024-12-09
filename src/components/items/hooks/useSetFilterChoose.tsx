import { Dispatch, RefObject, useEffect } from "react";
export enum subcategoryEnum {
  "Accessories" = "Accessories",
  "Phones" = "Phones",
  "0-500" = "0-500",
  "500-1000" = "500-1000",
  "1000-1500" = "1000-1500",
  "1500-2000" = "1500-2000",
  "1/1/2015" = "1/1/2015",
  "1/1/2016" = "1/1/2016",
  "1/1/2017" = "1/1/2017",
  "1/1/2018" = "1/1/2018",
  "1/1/2019" = "1/1/2019",
  "1/1/2020" = "1/1/2020",
  "1/1/2021" = "1/1/2021",
  "1/1/2022" = "1/1/2022",
}

function useSetFilterChoose(
  category: string,
  filterChooseRef: RefObject<HTMLSelectElement>,
  setSubcategory: Dispatch<React.SetStateAction<subcategoryEnum>>,
  subcategory: string
) {
  useEffect(() => {
    if (filterChooseRef.current) {
      filterChooseRef.current.innerHTML = "No filter";
    }
    const mySet = new Set<string>();
    if (category === "Category") {
      for (let i = 0; i <= 1; i++) mySet.add(Object.values(subcategoryEnum)[i]);
    } else if (category === "Price") {
      for (let i = 2; i <= 5; i++) {
        mySet.add(Object.values(subcategoryEnum)[i]);
      }
    } else if (category === "Uploaded date") {
      for (let i = 6; i <= 13; i++) {
        mySet.add(Object.values(subcategoryEnum)[i]);
      }
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
    switch (category) {
      case "Category":
        setSubcategory(subcategoryEnum.Accessories);
        break;
      case "Price":
        setSubcategory(subcategoryEnum["0-500"]);
        break;
      case "Uploaded date":
        setSubcategory(subcategoryEnum["1/1/2015"]);
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);
}
export default useSetFilterChoose;
