import { useContext, useEffect, useState } from "react";
import { ButtonsEnum, CartContext } from "../../Store/shopping-cart-context";
import Item from "../../components/Item/item";
import styles from "./Cart.module.scss";
import { useGetOrdersIds } from "../../fetchDataQueries/useGetOrdersIds";
import { useCreateOrder } from "../../fetchDataQueries/useCreateOrder";

function Cart() {
  const { shoppingCart, setShoppingCart, addId, setAddId } = useContext(CartContext);
  const [price, setPrice] = useState(0);
  const ordersData = useGetOrdersIds();
  const { createOrder, loading } = useCreateOrder();

  useEffect(() => {
    const sum = shoppingCart.reduce((total, item) => total + item.quantity * item.product.price, 0);
    setPrice(sum);
  }, [shoppingCart]);

  if (loading) return "Submitting...";
  const handleOrderConfirmation = () => {
    for (const item of shoppingCart) {
      createOrder({
        variables: { itemId: item.product.id, orderId: ordersData.data.reduce((maxId: number, order: { id: number }) => (order.id > maxId ? order.id : maxId), 0) + addId, amount: item.quantity },
      });
    }
    setShoppingCart([]);
    setAddId(addId + 1);
    alert("Order sent with total price of: " + price + "$");
  };

  return (
    <>
      <div className={styles.headline}>
        <h1>Welcome to cart: </h1>
        <button className={styles.buyButton} onClick={handleOrderConfirmation}>
          Confirm order
        </button>
        <h2>Total price: {price}$</h2>
      </div>
      <div className={styles.cart}>
        {shoppingCart.map((item) => {
          item.buttons = new Map<ButtonsEnum, boolean>([
            [ButtonsEnum.PlusMinus, true],
            [ButtonsEnum.Remove, true],
          ]);
          return <Item key={item.product.id} props={item} />;
        })}
      </div>
    </>
  );
}

export default Cart;
