import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./App.css";
import RootLayout from "./pages/RootLayout/RootLayout";
import HomePage from "./pages/HomePage/HomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Cart from "./pages/Cart/Cart";
import Prodact from "./pages/prodact/Prodact";
import { useState } from "react";
import { CartContext } from "./store/shopping-cart-context";

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
  const [shoppingCart] = useState({
    items: [],
    quantityHash: [],
  });
  return (
    <CartContext.Provider value={shoppingCart}>
      <RouterProvider router={router} />
    </CartContext.Provider>
  );
}

export default App;
