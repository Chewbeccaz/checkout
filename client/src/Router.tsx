import { createBrowserRouter } from "react-router-dom";
import WebshopApp from "./components/WebshopApp";
import Payment from "./components/Payment";
import Confirmation from "./components/Confirmation";
import { NotFound } from "./components/NotFound";
import { Layout } from "./components/Layout";

export const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <WebshopApp />,
        errorElement: <NotFound />,
      },
      {
        path: "/payment",
        element: <Payment />,
        errorElement: <NotFound />,
      },
      {
        path: "/confirmation",
        element: <Confirmation />,
        errorElement: <NotFound />,
      },
    ],
  },
]);
