import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import ItemPage from "./pages/ItemPage/ItemPage";
import { useState } from "react";
import { CartContext, CartItem } from "./Store/shopping-cart-context";
import Cart from "./pages/Cart/Cart";

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
        element: <ItemPage />,
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
