import styles from "./prodact.module.scss";
import md from "../../assets/MOCK_DATA.json";
import { useContext, useState } from "react";
import { ItemProps } from "../../components/item/item";
import { CartContext } from "../../store/shopping-cart-context";

function Prodact() {
  const crtx = useContext(CartContext);
  const id = parseInt(window.location.href.split("/").slice(-1)[0]);
  const [quantityHash, setQuantityHash] = useState(crtx.quantityHash);
  const [buttons, setButtons] = useState(
    crtx.quantityHash[id] == undefined || crtx.quantityHash[id] == 0 ? (
      <div></div>
    ) : (
      <div>
        <button
          className={styles.buyB}
          onClick={() => {
            crtx.quantityHash[id]--;
            if (crtx.quantityHash[id] == 0) {
              removeItemFromCart(id, crtx);
              crtx.quantityHash[id] = 0;
              setButtons(<></>);
            }
            setQuantityHash(crtx.quantityHash.slice());
          }}
        >
          -
        </button>
        <button
          className={styles.buyB}
          onClick={() => {
            crtx.quantityHash[id]++;
            setQuantityHash(crtx.quantityHash.slice());
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
  const removeItemFromCart = (
    ItemId: number,
    crtx: { items: ItemProps[]; quantityHash: number[] }
  ) => {
    crtx.items = crtx.items.filter(
      (item: { id: number }) => item.id !== ItemId
    );
  };
  const addItemToShoppingCart = (newItem: ItemProps) => {
    const sameItem = crtx.items.filter(
      (item: ItemProps) => item.id === newItem.id
    );
    if (sameItem.length == 0) {
      crtx.items = [...crtx.items, newItem];
      if (
        isNaN(crtx.quantityHash[newItem.id]) ||
        crtx.quantityHash[newItem.id] == 0
      ) {
        crtx.quantityHash[newItem.id] = 1;
      }
    } else {
      crtx.quantityHash[newItem.id]++;
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
          Items in cart: {quantityHash[id]}
        </div>
        <button
          className={styles.buyB}
          onClick={() => {
            addItemToShoppingCart(itemprop);
            setButtons(
              <div>
                <button
                  className={styles.buyB}
                  onClick={() => {
                    crtx.quantityHash[id]--;
                    if (crtx.quantityHash[id] == 0) {
                      removeItemFromCart(id, crtx);
                      crtx.quantityHash[id] = 0;
                      setButtons(<></>);
                    }
                    setQuantityHash(crtx.quantityHash.slice());
                  }}
                >
                  -
                </button>
                <button
                  className={styles.buyB}
                  onClick={() => {
                    crtx.quantityHash[id]++;
                    setQuantityHash(crtx.quantityHash.slice());
                  }}
                >
                  +
                </button>
              </div>
            );
            setQuantityHash(crtx.quantityHash.slice());
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
