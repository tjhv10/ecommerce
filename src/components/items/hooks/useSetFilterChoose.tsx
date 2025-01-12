// import { Dispatch, ReactElement, useEffect, useState } from "react";
// import styles from "../Items.module.scss";
// import Slider from "@mui/material/Slider";
// import { CategoryEnum, DateEnum, SubCategoryEnum } from "../enums";

// function useSetFilterChoose(
//   category: string,
//   subcategory: SubCategoryEnum | DateEnum | number[] | undefined,
//   setSubcategory: Dispatch<React.SetStateAction<DateEnum | number[] | SubCategoryEnum | undefined>>
// ) {
//   function valuetext(value: number) {
//     return `${value}$`;
//   }

//   const [options, setOptions] = useState<string[] | ReactElement>([]);

//   const handleChange = (_event: Event, newValue: number | number[]) => {
//     if (Array.isArray(newValue)) {
//       setSubcategory(newValue);
//     }
//   };

//   useEffect(() => {
//     let mySet = new Set<string>();

//     switch (category) {
//       case CategoryEnum.Price:
//         if (!Array.isArray(subcategory)) {
//           setSubcategory([0, 2000]);
//         }
//         setOptions(
//           <Slider
//             getAriaLabel={() => "Price range"}
//             value={Array.isArray(subcategory) ? subcategory : [0, 2000]}
//             onChange={handleChange}
//             valueLabelDisplay="auto"
//             getAriaValueText={valuetext}
//             className={styles.filtersBarItemPrice}
//             min={0}
//             max={2000}
//           />
//         );
//         break;

//       case CategoryEnum.Category:
//         mySet = new Set(Object.values(SubCategoryEnum));
//         if (
//           subcategory === undefined ||
//           !Object.values(SubCategoryEnum).includes(subcategory as SubCategoryEnum)
//         )
//           setSubcategory(SubCategoryEnum.Phone);
//         setOptions(
//           <select
//             className={styles.filtersBarItem}
//             onChange={(e) =>
//               setSubcategory(
//                 category === CategoryEnum.Category
//                   ? SubCategoryEnum[e.target.value as keyof typeof SubCategoryEnum]
//                   : DateEnum[e.target.value as keyof typeof DateEnum]
//               )
//             }>
//             {Array.from(mySet).map((option) => (
//               <option value={option} key={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         );
//         break;

//       case CategoryEnum.Date:
//         mySet = new Set(Object.values(DateEnum));
//         if (subcategory === undefined || !Object.values(DateEnum).includes(subcategory as DateEnum))
//           setSubcategory(DateEnum["1/1/2015"]);

//         setOptions(
//           <select
//             className={styles.filtersBarItem}
//             onChange={(e) => {
//               setSubcategory(DateEnum[e.target.value as keyof typeof DateEnum]);
//             }}>
//             {Array.from(mySet).map((option) => (
//               <option value={option} key={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         );
//         break;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [category, subcategory, setSubcategory]);

//   return options;
// }

// export default useSetFilterChoose;
