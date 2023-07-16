import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Homepage from "./components/Homepage"
import "./index.css"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  // {
  //   path: "/user-page",
  //   element: <UserPage />,
  // },
  // {
  //   path: "/create-user",
  //   element: <CreateUser/>
  // }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
