import { useContext } from "react";
import { CartContext } from "../../store/shopping-cart-context";
import styles from "./Cart.module.scss";

const removeItemFromCart = (ItemId: number, crtx: { items: ItemProps }) => {
  crtx.items = crtx.items.filter((item: { id: number }) => item.id !== ItemId);
};

function Cart() {
  const crtx = useContext(CartContext);
  return (
    <div className={styles.content}>
      {crtx.items.map((item) => (
        <div key={item.id} className={styles.item}>
          <div className={styles.hl}>{item.name}</div>
          <div className={styles.cat}>{item.category}</div>
          <div>
            <img
              className={styles.img}
              src={item.img_url}
              alt={`${item.name} pic`}
            />
          </div>
          <div className={styles.price}>Price: {item.price}$</div>
          <button
            className={styles.removeB}
            onClick={() => removeItemFromCart(item.id, crtx)}
          >
            Remove Item from Cart
          </button>
        </div>
      ))}
    </div>
  );
}
export default Cart;
