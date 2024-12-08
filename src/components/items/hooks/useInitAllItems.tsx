import { useEffect } from "react";
import md from "../../../assets/MOCK_DATA.json";
import { CartItem } from "../../../App";

function useInitAllItems(alli: CartItem[]) {
  useEffect(() => {
    for (let i = 0; i < md.length; i++) {
      const item: CartItem = {
        product: {
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
        },
        quantity: 1,
      };
      alli.push(item);
    }
  }, [alli]);
}
export default useInitAllItems;
