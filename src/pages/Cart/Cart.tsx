import { Dispatch, useContext, useState } from "react";
import { CartContext } from "../../Store/shopping-cart-context";
import styles from "./Cart.module.scss";
import { CartItem } from "../../App";
import { addItemToShoppingCart } from "../../components/Item/addAndRemoveItems";
import { removeItemToShoppingCart } from "../../components/Item/addAndRemoveItems";

const removeItemFromCart = (
  ItemId: number,
  shoppingCart: CartItem[],
  setShoppingCart: Dispatch<React.SetStateAction<CartItem[]>>
) => {
  setShoppingCart(shoppingCart.filter((item) => item.product.id !== ItemId));
};

function Cart() {
  const { shoppingCart, setShoppingCart } = useContext(CartContext);
  let sum = 0;
  shoppingCart.forEach((item) => {
    sum += item.quantity * item.product.price;
  });

  const [price, setPrice] = useState(sum);
  return (
    <>
      <div>Total price: {price}$</div>
      <div className={styles.content}>
        {shoppingCart.map((item) => (
          <div key={item.product.id} className={styles.item}>
            <div className={styles.hl}>{item.product.name}</div>
            <div className={styles.cat}>{item.product.category}</div>
            <div>
              <img
                className={styles.img}
                src={item.product.imgUrl}
                alt={`${item.product.name} pic`}
              />
            </div>
            <div className={styles.price}>Price: {item.product.price}$</div>
            <div className={styles.quantity}>quantity: {item.quantity}</div>
            <div>
              <button
                className={styles.removeB}
                onClick={() => {
                  const element = shoppingCart.find(
                    (element) => element.product.id === item.product.id
                  );
                  if (element) {
                    setShoppingCart(
                      removeItemToShoppingCart(shoppingCart, item)
                    );

                    if (element.quantity === 0) {
                      removeItemFromCart(
                        item.product.id,
                        shoppingCart,
                        setShoppingCart
                      );
                      setPrice(price - item.product.price);
                      return;
                    }
                  }
                  setPrice(price - item.product.price);
                }}
              >
                -
              </button>
              <button
                className={styles.removeB}
                onClick={() => {
                  setShoppingCart(addItemToShoppingCart(shoppingCart, item));
                  setPrice(price + item.product.price);
                }}
              >
                +
              </button>
            </div>

            <button
              className={styles.removeB}
              onClick={() => {
                const element = shoppingCart.find(
                  (element) => element.product.id === item.product.id
                );
                if (element) {
                  setPrice(price - element.quantity * element.product.price);
                }
                removeItemFromCart(
                  item.product.id,
                  shoppingCart,
                  setShoppingCart
                );
              }}
            >
              Remove Item from Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
export default Cart;
