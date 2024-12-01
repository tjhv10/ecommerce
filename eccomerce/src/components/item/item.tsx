import { Link } from "react-router-dom";
import styles from "./item.module.scss";
import { useContext } from "react";
import { CartContext } from "../../store/shopping-cart-context";

export interface ItemProps {
  id: number;
  brand: string;
  model: string;
  name: string;
  uploadedDate: string;
  Description: string;
  price: number;
  Seller_name: string;
  img_url: string;
  category: string;
}

const Item: React.FC<ItemProps> = (props) => {
  const crtx = useContext(CartContext);
  const addItemToShoppingCart = (Item: ItemProps) => {
    crtx.items = [...crtx.items, Item];
  };

  return (
    <div className={styles.item}>
      <div className={styles.hl}>{props.name}</div>
      <div className={styles.cat}>{props.category}</div>
      <div className={styles.des}>Description: {props.Description}</div>
      <div>
        {<img className={styles.img} src={props.img_url} alt="pic"></img>}
      </div>
      <div className={styles.price}>Price: {props.price}$</div>
      <div className={styles.sellerName}>Seller name: {props.Seller_name}</div>
      <div className={styles.uploadedDate}>
        Uploaded date: {props.uploadedDate}
      </div>
      <button
        className={styles.buyB}
        onClick={() => addItemToShoppingCart(props)}
      >
        Add to cart
      </button>
      <Link to={"/prodact/" + props.id}>
        <button className={styles.itemB}>Go to prodact</button>
      </Link>
    </div>
  );
};

export default Item;
