import Login from "./pages/login/Login";
import Ecom from "./pages/ecommerce/Ecom";
import AdminLogin from "./pages/adminLogin/AdminLogin"; //------------
import Register from "./pages/register/Register";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Navbar, NavbarDefault, NavbarAdmin } from "./components/navbar/Navbar";
import {
  LeftBarConsultant,
  LeftBarEntre,
  LeftBarSEntre,
  LeftBarDistributor,
  LeftBarCustomer,
  LeftBarAdmin,
} from "./components/leftBar/LeftBar";
import { RightBarChat } from "./components/rightBar/RightBar";
import {
  ConsultantReq,
  DistributorReq,
  EntrepreneurReq,
  SwitchReq,
  Home,
  SearchConsultant,
  SearchEntrepreneur,
  StartupReq,
  UserReq,
  PaymentP,
  Consultations,
  ListProducts,
  DeleteProducts,
} from "./pages/home/Home";
import Welcome from "./pages/welcome/welcome";
import { Blog } from "./components/blog/Blog";
import { Profile } from "./pages/profile/Profile";
import "./style.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/authContext";

import { AuthAdminContext } from "./context/authAdminContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const { currentAdmin } = useContext(AuthAdminContext);

  const { darkMode } = useContext(DarkModeContext);

  const Layout = () => {
    return (
      <>
        {/* If there is a logged-in user, show the main app layout */}
        {currentUser ? (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
              {/* Display the appropriate sidebar based on the user's role */}
              {currentUser.roll === "consultant" ? (
                <LeftBarConsultant />
              ) : currentUser.roll === "distributor" ? (
                <LeftBarDistributor />
              ) : currentUser.roll === "startup" ? (
                <LeftBarSEntre />
              ) : currentUser.roll === "customer" ? (
                <LeftBarCustomer />
              ) : (
                <LeftBarEntre />
              )}
              <div style={{ flex: 6 }}>
                <Outlet />
              </div>
              {/* Display the chat sidebar for all user roles except customers */}
              {currentUser.roll !== "customer" && <RightBarChat />}
            </div>
          </div>
        ) : (
          // If there is no logged-in user, show the default layout with only the navbar and app content
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <NavbarDefault />
            <div style={{ flex: 6, margin: "0 auto" }}>
              <Outlet />
            </div>
          </div>
        )}
      </>
    );
  };

  // This component is responsible for rendering the admin layout of the application
  const LayoutAdmin = () => {
    return (
      <>
        {currentAdmin ? (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <NavbarAdmin />
            <div style={{ display: "flex" }}>
              <LeftBarAdmin />
              <div style={{ flex: 6 }}>
                <Outlet />
              </div>
            </div>
          </div>
        ) : (
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Outlet />
          </div>
        )}
      </>
    );
  };






  // This creates the application's router with different routes and their respective components
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: currentUser ? <Home /> : <Welcome />,
        },
        {
          path: "/blog",
          element: currentUser ? <Blog /> : <Welcome />,
        },

        {
          path: "/profile/:id",
          element: currentUser ? <Profile /> : <Welcome />,
        },
        {
          path: "/searchentrepreneur",
          element:
            currentUser &&
              (currentUser.roll === "existing" ||
                currentUser.roll === "startup") ? (
              <SearchEntrepreneur />
            ) : !currentUser ? (
              <Welcome />
            ) : (
              <Home />
            ),
        },
        {
          path: "/searchconsultant",
          element:
            currentUser &&
              (currentUser.roll === "existing" ||
                currentUser.roll === "startup") ? (
              <SearchConsultant />
            ) : !currentUser ? (
              <Welcome />
            ) : (
              <Home />
            ),
        },
        {
          path: "/payment",
          element:
            currentUser &&
              (currentUser.roll === "existing" ||
                currentUser.roll === "startup") ? (
              <PaymentP />
            ) : !currentUser ? (
              <Welcome />
            ) : (
              <Home />
            ),
        },
        {
          path: "/listproducts",
          element:
            currentUser && currentUser.roll === "existing" ? (
              <ListProducts />
            ) : !currentUser ? (
              <Welcome />
            ) : (
              <Home />
            ),
        },
        {
          path: "/deleteproducts",
          element:
            currentUser && currentUser.roll === "existing" ? (
              <DeleteProducts />
            ) : !currentUser ? (
              <Welcome />
            ) : (
              <Home />
            ),
        },
        {
          path: "/ecommerce",
          element:
            currentUser && currentUser.roll === "customer" ? (
              <Ecom />
            ) : !currentUser ? (
              <Welcome />
            ) : (
              <Home />
            ),
        },
        {
          path: "/consultations",
          element:
            currentUser && currentUser.roll === "consultant" ? (
              <Consultations />
            ) : !currentUser ? (
              <Welcome />
            ) : (
              <Home />
            ),
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/admin",
      element: <LayoutAdmin />,
      children: [
        {
          path: "/admin",
          element: currentAdmin ? <UserReq /> : <AdminLogin />,
        },
        {
          path: "/admin/startup",
          element: currentAdmin ? <StartupReq /> : <AdminLogin />,
        },
        {
          path: "/admin/entreprenure",
          element: currentAdmin ? <EntrepreneurReq /> : <AdminLogin />,
        },
        {
          path: "/admin/consultant",
          element: currentAdmin ? <ConsultantReq /> : <AdminLogin />,
        },
        {
          path: "/admin/distributor",
          element: currentAdmin ? <DistributorReq /> : <AdminLogin />,
        },
        {
          path: "/admin/switchAC",
          element: currentAdmin ? <SwitchReq /> : <AdminLogin />,
        },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
