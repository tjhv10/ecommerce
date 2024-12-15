import { Link } from "react-router-dom";
import styles from "./mainNav.module.scss";
import { useContext } from "react";
import { CartContext } from "../../Store/shopping-cart-context";
import { MdOutlineShoppingCart } from "react-icons/md";
import { FcMultipleSmartphones } from "react-icons/fc";

function MainNavigation() {
  const { shoppingCart } = useContext(CartContext);

  const sum = shoppingCart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );
  const size = 50;
  return (
    <header>
      <div className={styles.main}>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <FcMultipleSmartphones size={size} />
              </Link>
            </li>
            <li>
              <ol>
                <li>
                  <Link to="/cart">
                    <MdOutlineShoppingCart size={size} />
                  </Link>
                </li>
                <li className={styles.quantity}>
                  <div>{sum}</div>
                </li>
              </ol>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;
