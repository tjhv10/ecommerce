import { useContext, useEffect, useState } from "react";
import { ButtonsEnum, CartContext } from "../../Store/shopping-cart-context";
import Item from "../../components/Item/Item";
import styles from "./Cart.module.scss";

function Cart() {
  const { shoppingCart, setShoppingCart } = useContext(CartContext);
  useEffect(() => {
    const filterdShoppingCart = shoppingCart.filter(
      (item) => item.quantity > 0
    );
    setShoppingCart(filterdShoppingCart);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              [ButtonsEnum.AddToCartAndGoToItemPage, false],
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
