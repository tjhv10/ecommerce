import { Link } from "react-router-dom";
import styles from "./item.module.scss";
import { useContext } from "react";
import { CartContext } from "../../Store/shopping-cart-context";
import { CartItem } from "../../App";

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
  const { setShoppingCart } = useContext(CartContext);
  const addItemToShoppingCart = (newItem: CartItem) => {
    setShoppingCart((prevState) => {
      const sameItem = prevState.find(
        ({ product }) => product.id === newItem.product.id
      );
      if (!sameItem) {
        newItem.quantity = 1;
        return [...prevState, newItem];
      }

      return prevState.map((item) => {
        const newItem = item;
        if (item.product.id === newItem.product.id) {
          newItem.quantity++;
        }
        return item.product.id === newItem.product.id ? newItem : item;
      });
    });
  };

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
      <button
        className={styles.buyB}
        onClick={() => {
          addItemToShoppingCart(props);
        }}
      >
        Add to cart
      </button>
      <Link to={{ pathname: "/prodact/" + props.product.id }}>
        <button className={styles.itemB}>Go to prodact</button>
      </Link>
    </div>
  );
};

export default Item;
