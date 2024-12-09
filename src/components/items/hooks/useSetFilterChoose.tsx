import { Dispatch, useEffect, useState } from "react";

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
  setSubcategory: Dispatch<
    React.SetStateAction<DateEnum | PriceEnum | subcategoryEnum | undefined>
  >
) {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    let mySet = new Set<string>();
    switch (category) {
      case "Price":
        mySet = new Set(Object.values(PriceEnum));
        break;
      case "Category":
        mySet = new Set(Object.values(subcategoryEnum));
        break;
      case "Uploaded date":
        mySet = new Set(Object.values(DateEnum));
        break;
      default:
        break;
    }
    setOptions(Array.from(mySet));
  }, [category]);

  useEffect(() => {
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
        setSubcategory(undefined);
        break;
    }
  }, [category, setSubcategory]);

  return options;
}

export default useSetFilterChoose;
