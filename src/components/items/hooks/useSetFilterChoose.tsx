import { Dispatch, ReactElement, useEffect, useState } from "react";
import { CategoryEnum } from "./useSetItemsCategory";
import styles from "../Items.module.scss";
import Slider from "@mui/material/Slider";

export enum subcategoryEnum {
  // TODO fix
  "Accessories" = "Accessories",
  "Phones" = "Phones",
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
  subcategory: subcategoryEnum | DateEnum | number[] | undefined,
  setSubcategory: Dispatch<
    React.SetStateAction<DateEnum | number[] | subcategoryEnum | undefined>
  >
) {
  function valuetext(value: number) {
    return `${value}$`;
  }

  const [options, setOptions] = useState<string[] | ReactElement>([]);

  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setSubcategory(newValue);
    }
  };

  useEffect(() => {
    let mySet = new Set<string>();

    switch (category) {
      case CategoryEnum.Price:
        if (!Array.isArray(subcategory)) {
          setSubcategory([0, 2000]);
        }
        setOptions(
          <Slider
            getAriaLabel={() => "Price range"}
            value={Array.isArray(subcategory) ? subcategory : [0, 2000]}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            className={styles.filtersBarItemPrice}
            min={0}
            max={2000}
          />
        );
        break;

      case CategoryEnum.Category:
        mySet = new Set(Object.values(subcategoryEnum));
        if (
          subcategory === undefined ||
          !Object.values(subcategoryEnum).includes(
            subcategory as subcategoryEnum
          )
        )
          setSubcategory(subcategoryEnum.Accessories);
        setOptions(
          <select
            className={styles.filtersBarItem}
            onChange={(e) =>
              setSubcategory(
                category === CategoryEnum.Category
                  ? subcategoryEnum[
                      e.target.value as keyof typeof subcategoryEnum
                    ]
                  : DateEnum[e.target.value as keyof typeof DateEnum]
              )
            }
          >
            {Array.from(mySet).map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        );
        break;

      case CategoryEnum["Uploaded date"]:
        mySet = new Set(Object.values(DateEnum));
        if (
          subcategory === undefined ||
          !Object.values(DateEnum).includes(subcategory as DateEnum)
        )
          setSubcategory(DateEnum["1/1/2015"]);

        setOptions(
          <select
            className={styles.filtersBarItem}
            onChange={(e) => {
              setSubcategory(DateEnum[e.target.value as keyof typeof DateEnum]);
            }}
          >
            {Array.from(mySet).map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        );
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, subcategory, setSubcategory]);

  return options;
}

export default useSetFilterChoose;
