import { Link } from "react-router-dom";
import styles from "./item.module.scss";
import { useContext } from "react";
import {
  ButtonsEnum,
  CartContext,
  CartItem,
} from "../../Store/shopping-cart-context.js";
import {
  addItemToShoppingCart,
  removeItemQuantityFromShoppingCart,
} from "./addAndRemoveItems.js";
import { removeItemFromCart } from "../items/functions/searchFunction.js";

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

      <div>
        <img className={styles.img} src={props.product.imgUrl} alt="pic" />
      </div>
      <div className={styles.des}>Description: {props.product.description}</div>
      <div className={styles.price}>Price: {props.product.price}$</div>
      <div className={styles.sellerName}>
        Seller name: {props.product.sellerName}
      </div>
      <div className={styles.uploadedDate}>
        Uploaded date: {props.product.uploadedDate}
      </div>
      {props.buttons.get(ButtonsEnum.AddToCartAndGoToItemPage) && (
        <div>
          <button
            className={styles.itemB}
            onClick={() => {
              setShoppingCart(addItemToShoppingCart(shoppingCart, props));
            }}
          >
            Add to cart
          </button>
          <Link to={{ pathname: "/prodact/" + props.product.id }}>
            <button className={styles.itemB}>Go to item page</button>
          </Link>
        </div>
      )}
      <div>
        {props.buttons.get(ButtonsEnum.PlusMinus) && (
          <div>
            <button
              className={styles.itemB}
              onClick={() => {
                const element = shoppingCart.find(
                  (element) => element.product.id === props.product.id
                );
                if (element) {
                  setShoppingCart(
                    removeItemQuantityFromShoppingCart(shoppingCart, props)
                  );

                  if (element.quantity === 1) {
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
            <button
              className={styles.itemB}
              onClick={() => {
                setShoppingCart(addItemToShoppingCart(shoppingCart, props));
              }}
            >
              +
            </button>
            quantity: {props.quantity}
          </div>
        )}
      </div>
      {props.buttons.get(ButtonsEnum.Remove) && (
        <button
          className={styles.itemB}
          onClick={() => {
            removeItemFromCart(props.product.id, shoppingCart, setShoppingCart);
          }}
        >
          Remove Item from Cart
        </button>
      )}
    </div>
  );
};
export default Item;
