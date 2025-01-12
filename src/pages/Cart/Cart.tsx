import { useContext, useEffect, useState } from "react";
import { ButtonsEnum, CartContext } from "../../Store/shopping-cart-context";
import Item from "../../components/Item/item";
import styles from "./Cart.module.scss";
import { useCreateOrder } from "../../fetchDataQueries/useCreateOrder";

function Cart() {
  const { shoppingCart, setShoppingCart } = useContext(CartContext);
  const [price, setPrice] = useState(0);
  const { createOrder, loading } = useCreateOrder();
  type createItemsOrderInput = {
    itemId: number;
    amount: number;
  };
  useEffect(() => {
    const sum = shoppingCart.reduce((total, item) => total + item.quantity * item.product.price, 0);
    setPrice(sum);
  }, [shoppingCart]);

  if (loading) return "Submitting...";
  const handleOrderConfirmation = () => {
    const itemsInput: createItemsOrderInput[] = shoppingCart.map((item) => ({
      itemId: item.product.id,
      amount: item.quantity,
    }));
    console.log(itemsInput);

    createOrder({
      variables: {
        createItemsOrderInput: itemsInput,
      },
    });
    setShoppingCart([]);
    alert("Order sent with total price of: " + price + "$");
  };

  return (
    <>
      <div className={styles.headline}>
        <h1>Welcome to cart: </h1>
        <button className={styles.buyButton} onClick={handleOrderConfirmation}>
          Confirm order
        </button>
        <h2 className={styles.totalPrice}>Total price: {price}$</h2>
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
