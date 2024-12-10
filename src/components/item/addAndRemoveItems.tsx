import { CartItem } from "../../Store/shopping-cart-context";

export function addItemToShoppingCart(
  shoppingCart: CartItem[],
  newItem: CartItem
) {
  const sameItem = shoppingCart.find(
    ({ product }) => product.id === newItem.product.id
  );

  if (!sameItem) {
    return [...shoppingCart, { ...newItem, quantity: 1 }];
  }

  return shoppingCart.map((item) =>
    item.product.id === newItem.product.id
      ? { ...item, quantity: item.quantity + 1 }
      : item
  );
}
export const removeItemQuantityFromShoppingCart = (
  shoppingCart: CartItem[],
  newItem: CartItem
): CartItem[] => {
  if (newItem.quantity === 1 || newItem.quantity === 0)
    shoppingCart.filter((items) => items.product.id !== newItem.product.id);
  return shoppingCart.map((item) =>
    item.product.id === newItem.product.id
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
};
