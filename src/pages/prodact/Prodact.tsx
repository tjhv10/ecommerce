import styles from "./prodact.module.scss";
import md from "../../assets/MOCK_DATA.json";
import { useContext } from "react";
import { CartItem } from "../../App";
import { CartContext } from "../../Store/shopping-cart-context";

function Prodact() {
  const { shoppingCart, setShoppingCart } = useContext(CartContext);
  const id = parseInt(window.location.href.split("/").slice(-1)[0]);
  const item: CartItem = {
    product: md[id],
    quantity: shoppingCart.find((element) => element.product.id === id)
      ? shoppingCart.find((element) => element.product.id === id)!.quantity
      : 1,
  };

  const addItemToShoppingCart = (
    shoppingCart: CartItem[],
    newItem: CartItem
  ): CartItem[] => {
    const sameItem = shoppingCart.find(
      ({ product }) => product.id === newItem.product.id
    );
    if (!sameItem) {
      return [...shoppingCart, newItem];
    }
    return shoppingCart.map((item) =>
      item.product.id === newItem.product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  };
  const removeItemToShoppingCart = (
    shoppingCart: CartItem[],
    newItem: CartItem
  ): CartItem[] => {
    if (newItem.quantity === 1)
      return shoppingCart.filter(
        (items) => items.product.id !== newItem.product.id
      );
    return shoppingCart.map((item) =>
      item.product.id === newItem.product.id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
  };

  return (
    <div className={styles.grid}>
      <div className={styles.item}>
        <div className={styles.hl}>{md[id].manufacturer + md[id].model}</div>
        <div className={styles.cat}>{md[id].category}</div>
        <div className={styles.des}>Description: {md[id].description}</div>
        <div>{<img src={md[id].imgUrl} className={styles.img}></img>}</div>
        <div className={styles.price}>Price: {md[id].price}$</div>
        <div className={styles.sellerName}>
          Seller name: {md[id].sellerName}
        </div>
        <div className={styles.uploadedDate}>
          Uploaded date: {md[id].uploadedDate}
        </div>
        <div className={styles.uploadedDate}>
          item in cart:{" "}
          {shoppingCart.find(({ product }) => product.id === id)
            ? shoppingCart.find(({ product }) => product.id === id)?.quantity
            : 0}
        </div>
        <button
          className={styles.buyB}
          onClick={() => {
            setShoppingCart(addItemToShoppingCart(shoppingCart, item));
          }}
        >
          Add to cart
        </button>
        <div>
          <button
            className={styles.removeB}
            onClick={() => {
              setShoppingCart(removeItemToShoppingCart(shoppingCart, item));
            }}
          >
            -
          </button>
          <button
            className={styles.removeB}
            onClick={() => {
              setShoppingCart(addItemToShoppingCart(shoppingCart, item));
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
export default Prodact;
