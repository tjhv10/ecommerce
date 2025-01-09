import styles from "./ItemPage.module.scss";
// import md from "../../assets/MOCK_DATA.json";
import { useContext } from "react";
import {
  ButtonsEnum,
  CartContext,
  CartItem,
} from "../../Store/shopping-cart-context";
import Item, { ItemProps } from "../../components/Item/item";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_ITEMS } from "../../assets/queries";
function ItemPage() {
  const { shoppingCart } = useContext(CartContext);
  const id = parseInt(useParams().id!);
  const { loading, error, data } = useQuery(GET_ITEMS);
  if (loading) {
    return "Loading...";
  }
  if (error) return `Error! ${error.message}`;
  const fetchedItems: ItemProps[] = data.getItems;

  const item: CartItem = {
    product:
      fetchedItems.find((item) => item.id === id) ||
      (function () {
        throw new Error("Item not found");
      })(),
    quantity: shoppingCart.find((element) => element.product.id === id)
      ? shoppingCart.find((element) => element.product.id === id)!.quantity
      : 0,
    buttons: new Map<ButtonsEnum, boolean>([[ButtonsEnum.PlusMinus, true]]),
  };

  return (
    <div className={styles.item}>
      <Item props={item} />
    </div>
  );
}
export default ItemPage;
