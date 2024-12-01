import { useContext, useState } from "react";
import { CartContext } from "../../store/shopping-cart-context";
import { ItemProps } from "../../components/item/item";

function Cart() {
  const [shoppingCart, setShoppingCart] = useState<ItemProps[]>([]);
  const crtx = useContext(CartContext);
  setShoppingCart(crtx.items);

  return <CartContext.Provider value={shoppingCart}></CartContext.Provider>;
}
export default Cart;
