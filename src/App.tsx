import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Prodact from "./pages/Prodact/Prodact";
import { useState } from "react";
import { CartContext } from "./store/shopping-cart-context";
import { ItemProps } from "./components/Item/Item";
import Cart from "./pages/Cart/Cart";

export interface CartItem {
  product: ItemProps;
  quantity: number;
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/prodact/:id",
        element: <Prodact />,
      },
    ],
  },
]);

function App() {
  const [shoppingCart, setShoppingCart] = useState<CartItem[]>([]);

  return (
    <CartContext.Provider value={{ shoppingCart, setShoppingCart }}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  );
}

export default App;
