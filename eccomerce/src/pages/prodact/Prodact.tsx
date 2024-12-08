import styles from "./prodact.module.scss";
import md from "../../assets/MOCK_DATA.json";
import { useContext, useState } from "react";
import { ItemProps } from "../../components/item/item";
import { CartContext } from "../../store/shopping-cart-context";
import { CartItem } from "../../App";

function Prodact() {
  const { setShoppingCart, shoppingCart } = useContext(CartContext);
  const id = parseInt(window.location.href.split("/").slice(-1)[0]);
  const [buttons, setButtons] = useState(
    shoppingCart[id].quantity === undefined ||
      shoppingCart[id].quantity === 0 ? (
      <div></div>
    ) : (
      <div>
        <button
          className={styles.buyB}
          onClick={() => {
            shoppingCart[id].quantity--;
            if (shoppingCart[id].quantity === 0) {
              removeItemFromCart(id, shoppingCart);
              shoppingCart[id].quantity = 0;
              setButtons(<></>);
            }
            // setQuantityHash(shoppingCart.quantity.slice());
          }}
        >
          -
        </button>
        <button
          className={styles.buyB}
          onClick={() => {
            shoppingCart[id].quantity++;
            // setQuantityHash(shoppingCart.quantity.slice());
          }}
        >
          +
        </button>
      </div>
    )
  );
  const itemprop: ItemProps = {
    id: md[id].id,
    brand: md[id].manufacturer,
    model: md[id].model,
    name: md[id].manufacturer + md[id].model,
    uploadedDate: md[id].uploaded_date,
    Description: md[id].descreption,
    price: md[id].price,
    Seller_name: md[id].seller_name,
    img_url: md[id].img_url,
    category: md[id].category,
  };
  const removeItemFromCart = (ItemId: number, shoppingCart: CartItem[]) => {
    setShoppingCart(shoppingCart.filter((item) => item.product.id !== ItemId));
  };
  const addItemToShoppingCart = (newItem: CartItem) => {
    const sameItem = shoppingCart.filter(
      (item) => item.product.id === newItem.product.id
    );
    if (sameItem.length === 0) {
      setShoppingCart([...shoppingCart, newItem]);
      {
        const element = shoppingCart.find((element) => element.product.id);
        if (element) element.quantity = 1;
      }
    } else {
      const element = shoppingCart.find((element) => element.product.id);
      if (element) element.quantity++;
    }
  };

  return (
    <div className={styles.grid}>
      <div className={styles.item}>
        <div className={styles.hl}>{md[id].manufacturer + md[id].model}</div>
        <div className={styles.cat}>{md[id].category}</div>
        <div className={styles.des}>Description: {md[id].descreption}</div>
        <div>{<img src={md[id].img_url} className={styles.img}></img>}</div>
        <div className={styles.price}>Price: {md[id].price}$</div>
        <div className={styles.sellerName}>
          Seller name: {md[id].seller_name}
        </div>
        <div className={styles.uploadedDate}>
          Uploaded date: {md[id].uploaded_date}
        </div>
        <div className={styles.uploadedDate}>
          Items in cart: {shoppingCart[id].quantity}
        </div>
        <button
          className={styles.buyB}
          onClick={() => {
            addItemToShoppingCart({ product: itemprop, quantity: 1 });
            setButtons(
              <div>
                <button
                  className={styles.buyB}
                  onClick={() => {
                    shoppingCart[id].quantity--;
                    if (shoppingCart[id].quantity === 0) {
                      removeItemFromCart(id, shoppingCart);
                      shoppingCart[id].quantity = 0;
                      setButtons(<></>);
                    }
                  }}
                >
                  -
                </button>
                <button
                  className={styles.buyB}
                  onClick={() => {
                    shoppingCart[id].quantity++;
                  }}
                >
                  +
                </button>
              </div>
            );
          }}
        >
          Add to cart
        </button>
        {buttons}
      </div>
    </div>
  );
}
export default Prodact;
