import { Link } from "react-router-dom";
import styles from "./item.module.scss";
import { useContext } from "react";
import {
  ButtonsEnum,
  CartContext,
  CartItem,
} from "../../Store/shopping-cart-context";
import {
  addItemToShoppingCart,
  removeItemQuantityFromShoppingCart,
} from "./addAndRemoveItems";
import { removeItemFromCart } from "../items/functions/searchFunction";

export interface ItemProps {
  id: number;
  manufacturer: string;
  model: string;
  name: string;
  uploadedDate: string;
  description: string;
  price: number;
  sellerName: string;
  imgUrl: string;
  category: string;
}

const Item = ({ props }: { props: CartItem }): JSX.Element => {
  const { shoppingCart, setShoppingCart } = useContext(CartContext);

  return (
    <div className={styles.item}>
      <div className={styles.hl}>{props.product.name}</div>
      <div className={styles.cat}>{props.product.category}</div>
      <div className={styles.des}>Description: {props.product.description}</div>
      <div>
        {
          <img
            className={styles.img}
            src={props.product.imgUrl}
            alt="pic"
          ></img>
        }
      </div>
      <div className={styles.price}>Price: {props.product.price}$</div>
      <div className={styles.sellerName}>
        Seller name: {props.product.sellerName}
      </div>
      <div className={styles.uploadedDate}>
        Uploaded date: {props.product.uploadedDate}
      </div>
      {props.buttons.get(ButtonsEnum.AddToCart) && (
        <button
          className={styles.buyB}
          onClick={() => {
            setShoppingCart(addItemToShoppingCart(shoppingCart, props));
          }}
        >
          Add to cart
        </button>
      )}
      {props.buttons.get(ButtonsEnum.Minus) && (
        <button
          className={styles.removeB}
          onClick={() => {
            const element = shoppingCart.find(
              (element) => element.product.id === props.product.id
            );
            if (element) {
              setShoppingCart(
                removeItemQuantityFromShoppingCart(shoppingCart, props)
              );

              if (element.quantity === 0) {
                removeItemFromCart(
                  props.product.id,
                  shoppingCart,
                  setShoppingCart
                );
                return;
              }
            }
          }}
        >
          -
        </button>
      )}
      {props.buttons.get(ButtonsEnum.Plus) && (
        <>
          <button
            className={styles.removeB}
            onClick={() => {
              setShoppingCart(addItemToShoppingCart(shoppingCart, props));
            }}
          >
            +
          </button>
          <div className={styles.quantity}>quantity: {props.quantity}</div>
        </>
      )}
      {props.buttons.get(ButtonsEnum.Remove) && (
        <button
          className={styles.removeB}
          onClick={() => {
            removeItemFromCart(props.product.id, shoppingCart, setShoppingCart);
          }}
        >
          Remove Item from Cart
        </button>
      )}
      {props.buttons.get(ButtonsEnum.GoToItem) && (
        <Link to={{ pathname: "/prodact/" + props.product.id }}>
          <button className={styles.itemB}>Go to prodact</button>
        </Link>
      )}
    </div>
  );
};

export default Item;
