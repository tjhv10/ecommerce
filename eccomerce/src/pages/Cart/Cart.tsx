import { useContext, useState } from "react";
import { CartContext } from "../../store/shopping-cart-context";
import styles from "./Cart.module.scss";
import { ItemProps } from "../../components/item/item";

const removeItemFromCart = (
  ItemId: number,
  crtx: { items: ItemProps[]; quantityHash: number[] }
) => {
  crtx.items = crtx.items.filter((item: { id: number }) => item.id !== ItemId);
};

function Cart() {
  const crtx = useContext(CartContext);
  const [items, setItems] = useState(crtx.items);
  const [quantityHash, setQuantityHash] = useState(crtx.quantityHash);
  return (
    <div className={styles.content}>
      {items.map((item) => (
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
          <div className={styles.quantity}>
            quantity: {quantityHash[item.id]}
          </div>
          <div>
            <button
              className={styles.removeB}
              onClick={() => {
                crtx.quantityHash[item.id]--;
                if (crtx.quantityHash[item.id] == 0) {
                  removeItemFromCart(item.id, crtx);
                  crtx.quantityHash[item.id] = 0;
                  setQuantityHash(crtx.quantityHash);
                  setItems(crtx.items);
                }
                const newQuantityHash = crtx.quantityHash.slice();
                setQuantityHash(newQuantityHash);
              }}
            >
              -
            </button>
            <button
              className={styles.removeB}
              onClick={() => {
                crtx.quantityHash[item.id]++;
                const newQuantityHash = crtx.quantityHash.slice();
                setQuantityHash(newQuantityHash);
              }}
            >
              +
            </button>
          </div>

          <button
            className={styles.removeB}
            onClick={() => {
              removeItemFromCart(item.id, crtx);
              crtx.quantityHash[item.id] = 0;
              setQuantityHash(crtx.quantityHash);
              setItems(crtx.items);
            }}
          >
            Remove Item from Cart
          </button>
        </div>
      ))}
    </div>
  );
}
export default Cart;
