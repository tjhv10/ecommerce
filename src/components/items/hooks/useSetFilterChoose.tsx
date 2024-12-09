import { Dispatch, RefObject, useEffect } from "react";
export enum subcategoryEnum {
  "Accessories" = "Accessories",
  "Phones" = "Phones",
}
export enum PriceEnum {
  "0-500" = "0-500",
  "500-1000" = "500-1000",
  "1000-1500" = "1000-1500",
  "1500-2000" = "1500-2000",
}
export enum DateEnum {
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
  setSubcategory: Dispatch<
    React.SetStateAction<DateEnum | PriceEnum | subcategoryEnum | undefined>
  >,
  subcategory: string | undefined
) {
  useEffect(() => {
    if (filterChooseRef.current) {
      filterChooseRef.current.innerHTML = "No filter";
    }
    const mySet = new Set<string>();
    switch (category) {
      case "Price":
        for (const price in PriceEnum) {
          mySet.add(price);
        }
        break;
      case "Category":
        for (const cat in subcategoryEnum) {
          mySet.add(cat);
        }
        break;
      case "Uploaded date":
        for (const date in DateEnum) {
          mySet.add(date);
        }
        break;
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
        setSubcategory(PriceEnum["0-500"]);
        break;
      case "Uploaded date":
        setSubcategory(DateEnum["1/1/2015"]);
        break;
      default:
        break;
    }
  }, [category, filterChooseRef, setSubcategory]);
}
export default useSetFilterChoose;
