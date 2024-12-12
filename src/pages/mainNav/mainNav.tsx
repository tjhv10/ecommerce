import { Link } from "react-router-dom";
import styles from "./mainNav.module.scss";
import { useContext } from "react";
import { CartContext } from "../../Store/shopping-cart-context";
import { MdOutlineShoppingCart } from "react-icons/md";
function MainNavigation() {
  const { shoppingCart } = useContext(CartContext);

  const sum = shoppingCart.reduce(
    (accumulator, currentValue) => accumulator + currentValue.quantity,
    0
  );

  return (
    <header>
      <div className={styles.main}>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <img
                  src="https://i.pinimg.com/736x/16/48/41/164841e3ae4f5369f1b4299df0a17154.jpg"
                  height="30px"
                  width="30px"
                ></img>
              </Link>
            </li>
            <li>
              <div>{sum}</div>
              <Link to="/cart">
                <MdOutlineShoppingCart size={30} />
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default MainNavigation;
