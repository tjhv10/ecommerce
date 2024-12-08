import { useContext, useState } from "react";
import { CartContext } from "../../store/shopping-cart-context";
import styles from "./Cart.module.scss";
import { CartItem } from "../../App";

const removeItemFromCart = (
  ItemId: number,
  shoppingCart: CartItem[],
  setShoppingCart: (arg0: CartItem[]) => void
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
                src={item.product.img_url}
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
                    setShoppingCart((prevState) => {
                      {
                        return prevState.map((ListItem) => {
                          const newItem = ListItem;
                          if (item.product.id === ListItem.product.id) {
                            newItem.quantity--;
                          }
                          return item.product.id === ListItem.product.id
                            ? item
                            : newItem;
                        });
                      }
                    });

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
                  setShoppingCart((prevState) => {
                    {
                      return prevState.map((ListItem) => {
                        const newItem = ListItem;
                        if (item.product.id === ListItem.product.id) {
                          newItem.quantity++;
                        }
                        return item.product.id === ListItem.product.id
                          ? item
                          : newItem;
                      });
                    }
                  });
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
                  setPrice(price - element.quantity * item.product.price);
                  element.quantity = 0;
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
