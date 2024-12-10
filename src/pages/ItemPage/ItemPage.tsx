import styles from "./ItemPage.module.scss";
import md from "../../assets/MOCK_DATA.json";
import { useContext } from "react";
import {
  ButtonsEnum,
  CartContext,
  CartItem,
} from "../../Store/shopping-cart-context";
import Item from "../../components/Item/Item";

function ItemPage() {
  const { shoppingCart } = useContext(CartContext);
  const id = parseInt(window.location.href.split("/").slice(-1)[0]);
  const item: CartItem = {
    product: md[id],
    quantity: shoppingCart.find((element) => element.product.id === id)
      ? shoppingCart.find((element) => element.product.id === id)!.quantity
      : 0,
    buttons: new Map<ButtonsEnum, boolean>([
      [ButtonsEnum.AddToCart, true],
      [ButtonsEnum.Plus, true],
      [ButtonsEnum.Minus, true],
      [ButtonsEnum.Remove, false],
      [ButtonsEnum.GoToItem, false],
    ]),
  };

  return (
    <div className={styles.item}>
      <Item props={item} />
    </div>
  );
}
export default ItemPage;
