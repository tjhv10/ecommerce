import styles from "./prodact.module.scss";
import md from "../../assets/MOCK_DATA.json";
import { useContext, useState } from "react";
import { CartContext } from "../../store/shopping-cart-context";
import { CartItem } from "../../App";

function Prodact() {
  const { setShoppingCart, shoppingCart } = useContext(CartContext);

  const id = parseInt(window.location.href.split("/").slice(-1)[0]);
  const itemprop: CartItem = {
    product: {
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
    },
    quantity: 1,
  };
  const [buttons, setButtons] = useState(
    shoppingCart.find((element) => element.product.id === id) === undefined ||
      shoppingCart.find((element) => element.product.id === id)?.quantity ===
        0 ? (
      <div></div>
    ) : (
      <div>
        <button
          className={styles.removeB}
          onClick={() => {
            const newItem = {
              product: itemprop.product,
              quantity: 1,
            };
            setShoppingCart((prevState) => {
              const sameItem = prevState.find(
                ({ product }) => product.id === id
              );
              if (!sameItem) {
                newItem.quantity = 1;
                return [...prevState, newItem];
              } else {
                return prevState.map((item) => {
                  const newNewItem = item;
                  if (item.product.id === id) {
                    if (newNewItem.quantity === 1) {
                      const newlist = shoppingCart.filter(
                        (item) => item.product.id !== id
                      );
                      console.log(newlist);
                      setShoppingCart(newlist);
                      setButtons(<></>);
                    }
                    --newNewItem.quantity;
                  }
                  return item.product.id === id ? newNewItem : item;
                });
              }
            });
          }}
        >
          -
        </button>
        <button
          className={styles.removeB}
          onClick={() => {
            additempropToShoppingCart({
              product: itemprop.product,
              quantity: 1,
            });
          }}
        >
          +
        </button>
      </div>
    )
  );

  const additempropToShoppingCart = (newItem: CartItem) => {
    setShoppingCart((prevState) => {
      const sameItem = prevState.find(({ product }) => product.id === id);
      console.log(sameItem);

      if (!sameItem) {
        newItem.quantity = 1;
        return [...prevState, newItem];
      } else {
        return prevState.map((item) => {
          const newNewItem = item;
          if (item.product.id === id) {
            newNewItem.quantity++;
          }
          return item.product.id === id ? newNewItem : item;
        });
      }
    });
  };

  return (
    <div className={styles.grid}>
      <div className={styles.itemprop}>
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
          item in cart:{" "}
          {shoppingCart.find(({ product }) => product.id === id)
            ? shoppingCart.find(({ product }) => product.id === id)?.quantity
            : 0}
        </div>
        <button
          className={styles.buyB}
          onClick={() => {
            additempropToShoppingCart({
              product: itemprop.product,
              quantity: 1,
            });
            setButtons(
              <div>
                <button
                  className={styles.removeB}
                  onClick={() => {
                    const newItem = {
                      product: itemprop.product,
                      quantity: 1,
                    };
                    setShoppingCart((prevState) => {
                      const sameItem = prevState.find(
                        ({ product }) => product.id === id
                      );
                      console.log(sameItem);

                      if (!sameItem) {
                        newItem.quantity = 1;
                        return [...prevState, newItem];
                      } else {
                        return prevState.map((item) => {
                          const newNewItem = item;
                          if (item.product.id === id) {
                            if (newNewItem.quantity === 1) {
                              const newlist = shoppingCart.filter(
                                (item) => item.product.id !== id
                              );
                              console.log(newlist);
                              setShoppingCart(newlist);
                              setButtons(<></>);
                            }
                            --newNewItem.quantity;
                          }
                          return item.product.id === id ? newNewItem : item;
                        });
                      }
                    });
                  }}
                >
                  -
                </button>
                <button
                  className={styles.removeB}
                  onClick={() => {
                    additempropToShoppingCart({
                      product: itemprop.product,
                      quantity: 1,
                    });
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
