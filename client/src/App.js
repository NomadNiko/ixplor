import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import { useContext, useEffect } from "react";
import axios from "axios";

// Import layouts
import ActivateLayout from "./Layouts/ActivateLayout/ActivateLayout";
import AuthLayout from "./Layouts/AuthLayout/AuthLayout";
import ProfileLayout from "./Layouts/ProfileLayout/ProfileLayout";
import ResetLayout from "./Layouts/ResetLayout/ResetLayout";
import { AuthContext } from "./context/AuthContext";

// Import SEO components
import { Helmet } from "react-helmet";

// 404 Component
const NotFound = () => (
  <div className="not-found-container">
    <Helmet>
      <title>404 Not Found - iXplor</title>
      <meta name="description" content="Page not found. Please check the URL or navigate back to home." />
    </Helmet>
    <h1>404 Not Found</h1>
    <p>The page you're looking for doesn't exist.</p>
    <a href="/" className="back-home">Return to Home</a>
  </div>
);

function App() {
  const { dispatch, token, isLoggedIn } = useContext(AuthContext);

  // get access token
  useEffect(() => {
    const _appSignging = localStorage.getItem("_appSignging");
    if (_appSignging) {
      const getToken = async () => {
        const res = await axios.post("/api/auth/access", null);
        dispatch({ type: "GET_TOKEN", payload: res.data.ac_token });
      };
      getToken();
    }
  }, [dispatch, isLoggedIn]);

  // get user data
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        dispatch({ type: "SIGNING" });
        const res = await axios.get("/api/auth/user", {
          headers: { Authorization: token },
        });
        dispatch({ type: "GET_USER", payload: res.data });
      };
      getUser();
    }
  }, [dispatch, token]);

  // SEO and Analytics tracking
  useEffect(() => {
    // Track page views
    const trackPageView = () => {
      if (window.gtag) {
        window.gtag('config', 'G-XXXXXXXXXX', {
          page_path: window.location.pathname,
        });
      }
    };

    trackPageView();
  }, []);

  // Define routes with SEO considerations
  const router = createBrowserRouter([
    {
      path: "/",
      element: isLoggedIn ? <ProfileLayout /> : <AuthLayout />,
      loader: ({ request }) => {
        // Handle trailing slashes for root path
        const url = new URL(request.url);
        if (url.pathname !== "/" && url.pathname.endsWith("/")) {
          return redirect(url.pathname.slice(0, -1) + url.search);
        }
        return null;
      }
    },
    {
      path: "/auth/reset-password/:token",
      element: <ResetLayout />,
      loader: ({ request }) => {
        const url = new URL(request.url);
        if (url.pathname.endsWith('/')) {
          return redirect(url.pathname.slice(0, -1) + url.search);
        }
        return null;
      }
    },
    {
      path: "/api/auth/activate/:activation_token",
      element: <ActivateLayout />,
      loader: ({ request }) => {
        const url = new URL(request.url);
        if (url.pathname.endsWith('/')) {
          return redirect(url.pathname.slice(0, -1) + url.search);
        }
        return null;
      }
    },
    // Handle .html and .php extensions
    {
      path: "/*.html",
      loader: ({ params }) => {
        return redirect(params["*"]);
      }
    },
    {
      path: "/*.php",
      loader: ({ params }) => {
        return redirect(params["*"]);
      }
    },
    // 404 route
    {
      path: "*",
      element: <NotFound />,
    },
  ]);

  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#2b1346" />
      </Helmet>
      <RouterProvider router={router} />
    </>
  );
}

export default App;