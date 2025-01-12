// import { Dispatch, SetStateAction, useEffect } from "react";
// // import md from "../../../assets/MOCK_DATA.json";
// import { ButtonsEnum, CartItem } from "../../../Store/shopping-cart-context";
// import { ItemProps } from "../../Item/item";
// import { CategoryEnum, DateEnum } from "../enums";

// function useSetItemsCategory(
//   items: { [x: string]: ItemProps[] },
//   addItem: (item: CartItem) => void,
//   setItems: Dispatch<SetStateAction<CartItem[]>>,
//   category: string,
//   setSubcategory: Dispatch<CategoryEnum | DateEnum | number[] | undefined>,
//   loading: boolean
// ) {
//   useEffect(() => {
//     if (loading) {
//       return;
//     }
//     setItems([]);
//     const sortedItems = Object.values(items)
//       .flat()
//       .sort((a: ItemProps, b: ItemProps) => a.id - b.id);
//     for (const sortedItem of sortedItems) {
//       const item: CartItem = {
//         product: sortedItem,
//         quantity: 1,
//         buttons: new Map<ButtonsEnum, boolean>([[ButtonsEnum.AddToCartAndGoToItemPage, true]]),
//       };

//       switch (category) {
//         case CategoryEnum["No filter"]: {
//           addItem(item);
//           break;
//         }
//         case CategoryEnum["Category"]: {
//           if (item.product.categories.some((category) => category.name === subcategory)) {
//             addItem(item);
//           }
//           break;
//         }
//         case CategoryEnum["Price"]: {
//           if (Array.isArray(subcategory) && subcategory.length === 2) {
//             const [lowPrice, highPrice] = subcategory;
//             if (item.product.price >= lowPrice && item.product.price <= highPrice) addItem(item);
//           }
//           break;
//         }
//         case CategoryEnum["Uploaded date"]: {
//           if (
//             typeof subcategory === "string" &&
//             Date.parse(item.product.uploadDate) >= Date.parse(subcategory!)
//           )
//             addItem(item);
//           break;
//         }
//       }
//       switch (category) {
//         case CategoryEnum["No filter"]: {
//           setSubcategory(subcategoryEnum["No filter" as keyof typeof subcategoryEnum]);
//           break;
//         }
//       }
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [loading, category, subcategory]);
// }

// export default useSetItemsCategory;
