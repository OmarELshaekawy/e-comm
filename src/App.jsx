import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./component/Layout/Layout";
import Prouduct from "./component/Prouduct/Prouduct";
import Cart from "./component/Cart/Cart";
import Signup from "./component/Signup/Signup";
import Login from "./component/Login/Login";
import Notfound from "./component/Notfound/Notfound";
import Categories from "./component/Categories/Categories";
import Prands from "./component/Prands/Prands";
import ForgetPassword from "./component/Forgetpassword/ForgetPassword";
import UpdatePassword from "./component/Updatepassword/UpdatePassword";
import ProductDetailes from "./component/ProductDetailes/ProductDetailes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> }, // هنا خليته يفتح على صفحة اللوجين
      { path: "prouduct", element: <Prouduct /> },
      { path: "cart", element: <Cart /> },
      { path: "register", element: <Signup /> },
      { path: "login", element: <Login /> },
      { path: "ProductDetailes/:id", element: <ProductDetailes /> },
      { path: "Forgetpassword", element: <ForgetPassword /> },
      { path: "Updatepassword", element: <UpdatePassword /> },
      { path: "categories", element: <Categories /> },
      { path: "prands", element: <Prands /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);

const client = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <RouterProvider router={router} />
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
