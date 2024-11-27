import styles from "./prodact.module.scss";
import md from "../../assets/MOCK_DATA.json";

function Prodact() {
  const id = window.location.href.split("/").slice(-1)[0];
  return (
    <div className={styles.grid}>
      <div className={styles.item}>
        <div className={styles.hl}>
          {md[parseInt(id)].manufacturer + md[parseInt(id)].model}
        </div>
        <div className={styles.cat}>{md[parseInt(id)].category}</div>
        <div className={styles.des}>
          Description: {md[parseInt(id)].descreption}
        </div>
        <div>
          {<img src={md[parseInt(id)].img_url} className={styles.img}></img>}
        </div>
        <div className={styles.price}>Price: {md[parseInt(id)].price}$</div>
        <div className={styles.sellerName}>
          Seller name: {md[parseInt(id)].seller_name}
        </div>
        <div className={styles.uploadedDate}>
          Uploaded date: {md[parseInt(id)].uploaded_date}
        </div>
        <button className={styles.buyB}>Add to cart</button>
      </div>
    </div>
  );
}
export default Prodact;
