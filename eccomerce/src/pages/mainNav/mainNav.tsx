import { Link } from "react-router-dom";
import styles from "./mainNav.module.scss";
import search from "../../components/items/items";

function MainNavigation() {
  return (
    <header>
      <div className={styles.main}>
        <nav>
          <ul>
            <li>
              <Link to="/" onClick={() => search("")}>
                <img
                  src="https://i.pinimg.com/736x/16/48/41/164841e3ae4f5369f1b4299df0a17154.jpg"
                  height="50px"
                  width="50px"
                ></img>
              </Link>
            </li>
            <li>
              <Link to="/cart">
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
