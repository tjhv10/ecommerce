import styles from "./ItemPage.module.scss";
import md from "../../assets/MOCK_DATA.json";
import { useContext } from "react";
import {
  ButtonsEnum,
  CartContext,
  CartItem,
} from "../../Store/shopping-cart-context";
import Item from "../../components/Item/item";
import { useParams } from "react-router-dom";

function ItemPage() {
  const { shoppingCart } = useContext(CartContext);
  const id = parseInt(useParams().id!);

  const item: CartItem = {
    product: md[id],
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
