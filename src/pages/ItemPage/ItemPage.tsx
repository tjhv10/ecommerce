import styles from "./ItemPage.module.scss";
import { useContext } from "react";
import {
  ButtonsEnum,
  CartContext,
  CartItem,
} from "../../Store/shopping-cart-context";
import Item from "../../components/Item/item";
import { useParams } from "react-router-dom";
import useGetItemById from "../../fetchDataQueries/useGetItemById";
function ItemPage() {
  const { shoppingCart } = useContext(CartContext);
  const id = parseInt(useParams().id!);
  const data = useGetItemById(id);

  const item: CartItem = {
    product: data,
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
