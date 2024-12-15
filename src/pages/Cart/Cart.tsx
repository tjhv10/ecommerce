import { useContext, useEffect, useState } from "react";
import { ButtonsEnum, CartContext } from "../../Store/shopping-cart-context";
import Item from "../../components/Item/item";
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
      <h1>Welcome to cart:</h1>
      Total price: {price}$
      <div className={styles.content}>
        {shoppingCart.map(
          (item) => (
            (item.buttons = new Map<ButtonsEnum, boolean>([
              [ButtonsEnum.PlusMinus, true],
              [ButtonsEnum.Remove, true],
            ])),
            (<Item key={item.product.id} props={item} />)
          )
        )}
      </div>
    </>
  );
}
export default Cart;
