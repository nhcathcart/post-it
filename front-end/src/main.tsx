import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import Homepage from "./components/Homepage";
import "./index.css";
import LoginPage from "./components/LoginPage";
import CreateUserPage from "./components/CreateUserPage";
import Protected from "./components/Protected";
import CalendarPage from "./components/CalendarPage"
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected />,
    children: [
      {
        path: "/home",
        element: <Homepage />,
      },
      {
        path: "/calendar",
        element: <CalendarPage />,
      }
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/create-user",
    element: <CreateUserPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);