import styles from "./ItemPage.module.scss";
import md from "../../assets/MOCK_DATA.json";
import { useContext } from "react";
import {
  ButtonsEnum,
  CartContext,
  CartItem,
} from "../../Store/shopping-cart-context";
import { addItemToShoppingCart } from "../../components/Item/addAndRemoveItems";
import { removeItemToShoppingCart } from "../../components/Item/addAndRemoveItems";

function Prodact() {
  const { shoppingCart, setShoppingCart } = useContext(CartContext);
  const id = parseInt(window.location.href.split("/").slice(-1)[0]);
  const item: CartItem = {
    product: md[id],
    quantity: shoppingCart.find((element) => element.product.id === id)
      ? shoppingCart.find((element) => element.product.id === id)!.quantity
      : 1,
    buttons: new Map<ButtonsEnum, boolean>([
      [ButtonsEnum.AddToCart, false],
      [ButtonsEnum.Plus, true],
      [ButtonsEnum.Minus, true],
      [ButtonsEnum.Remove, true],
      [ButtonsEnum.GoToItem, true],
    ]),
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
