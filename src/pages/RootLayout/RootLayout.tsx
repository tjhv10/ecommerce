import { Outlet } from "react-router-dom";
import MainNavigation from "../MainNav/MainNav";
import styles from "./RootLayout.module.scss";

function RootLayout() {
  return (
    <>
      <div className={styles.navBar}>
        <MainNavigation />
      </div>
      <>
        <Outlet />
      </>
    </>
  );
}
export default RootLayout;
