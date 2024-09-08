import Cookies from "js-cookie";

import { Login } from "./pages/login";
import { About } from "./pages/about";
import { Profile } from "./pages/profile";
import { Register } from "./pages/register";
import { Dashboard } from "./pages/dashboard";
import { ReactNode } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const isAuthenticated = Cookies.get("token");
  
  if (!isAuthenticated) {
    return <Navigate to="/"/>;
  }
  
  return children;
};

export function App() {

  const isAuthenticated = Cookies.get("token");

  const router = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? <Navigate to="/dashboard"/> : <Login/>
    },
    {
      path: "/register",
      element: <Register/>
    },
    {
      path: "/about",
      element: <About/>
    },
    {
      path: "/dashboard",
      element: <PrivateRoute><Dashboard/></PrivateRoute>
    },
    {
      path: "/profile",
      element: <PrivateRoute><Profile/></PrivateRoute>
    },
  ]);

  return(
    <div className="text-sm">
      <RouterProvider router={router}/>
    </div>
  );
}