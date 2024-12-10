import { useContext, useEffect, useState } from "react";
import { ButtonsEnum, CartContext } from "../../Store/shopping-cart-context";
import Item from "../../components/Item/Item";
import styles from "./Cart.module.scss";

function Cart() {
  const { shoppingCart } = useContext(CartContext);

  useEffect(() => {
    let sum = 0;
    shoppingCart.forEach((item) => {
      sum += item.quantity * item.product.price;
    });
    setPrice(sum);
  }, [shoppingCart]);

  const [price, setPrice] = useState(0);
  return (
    <>
      price: {price}$
      <div className={styles.content}>
        {shoppingCart.map(
          (item) => (
            (item.buttons = new Map<ButtonsEnum, boolean>([
              [ButtonsEnum.AddToCart, false],
              [ButtonsEnum.Plus, true],
              [ButtonsEnum.Minus, true],
              [ButtonsEnum.Remove, true],
              [ButtonsEnum.GoToItem, false],
            ])),
            (<Item key={item.product.id} props={item} />)
          )
        )}
      </div>
    </>
  );
}
export default Cart;
