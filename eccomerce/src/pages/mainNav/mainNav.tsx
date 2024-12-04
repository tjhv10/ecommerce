import { Link } from "react-router-dom";
import styles from "./mainNav.module.scss";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../store/shopping-cart-context";

function MainNavigation() {
  const crtx = useContext(CartContext);
  const [sum, setSum] = useState(0);
  useEffect(() => {
    const calSum = crtx.quantityHash.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
    setSum(calSum);
  }, [crtx]);

  return (
    <header>
      <div className={styles.main}>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <img
                  src="https://i.pinimg.com/736x/16/48/41/164841e3ae4f5369f1b4299df0a17154.jpg"
                  height="50px"
                  width="50px"
                ></img>
              </Link>
            </li>
            <li>
              <Link to="/cart">
                <div>{sum}</div>
                <img
                  src="https://banner2.cleanpng.com/20180426/jxq/avez1anz5.webp"
                  height="50px"
                  width="50px"
                ></img>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;
