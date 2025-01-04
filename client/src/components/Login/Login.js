import { useContext, useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { isEmpty, isEmail } from "../helper/validate";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "../Input/Input";
import "./login.css";
import { AuthContext } from "../../context/AuthContext";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(initialState);
  const { email, password } = data;
  const { dispatch } = useContext(AuthContext);
  const [googleButton, setGoogleButton] = useState(null);

  useEffect(() => {
    const initializeGoogle = async () => {
      try {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = "https://accounts.google.com/gsi/client";
          script.async = true;
          script.defer = true;
          script.onload = resolve;
          script.onerror = reject;
          document.body.appendChild(script);
        });

        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
            callback: handleGoogleSignIn,
            context: "signin",
          });

          // Create a hidden button that we'll programmatically click
          const googleDiv = document.createElement("div");
          googleDiv.style.display = "none";
          document.body.appendChild(googleDiv);

          window.google.accounts.id.renderButton(googleDiv, {
            type: "standard",
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
          });

          setGoogleButton(googleDiv.querySelector('div[role="button"]'));
        }
      } catch (error) {
        console.error("Failed to initialize Google Sign-In:", error);
      }
    };

    initializeGoogle();

    return () => {
      // Cleanup
      const hiddenButton = document.querySelector(
        'div[style="display: none;"]'
      );
      if (hiddenButton) {
        hiddenButton.remove();
      }
    };
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const handleGoogleClick = (e) => {
    e.preventDefault();
    if (googleButton) {
      googleButton.click();
    } else {
      toast(
        "Google Sign-In is not available at the moment. Please try again later.",
        {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        }
      );
    }
  };

  const handleGoogleSignIn = async (response) => {
    if (!response.credential) {
      toast("Google Sign-In failed. Please try again.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
      return;
    }
  
    try {
      const res = await axios.post("/api/auth/google_signing", {
        tokenId: response.credential,
      });
      localStorage.setItem("_appSignging", true);
      dispatch({ type: "SIGNING" });
      
      // Show appropriate success message based on whether account was created or signed in
      toast(res.data.msg, {
        className: "toast-success",
        bodyClassName: "toast-success",
        autoClose: 2500,
      });
    } catch (err) {
      toast(err.response?.data?.msg || "Google sign-in failed", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  const login = async (e) => {
    e.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      return toast("Please fill in all fields.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }

    if (!isEmail(email)) {
      return toast("Please enter a valid email address.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }

    try {
      const res = await axios.post("/api/auth/signing", { email, password });
      localStorage.setItem("_appSignging", true);
      dispatch({ type: "SIGNING" });
      toast(res.data.msg || "Login successful", {
        className: "toast-success",
        bodyClassName: "toast-success",
        autoClose: 2500,
      });
    } catch (err) {
      toast(err.response?.data?.msg || "Login failed", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <form className="login" onSubmit={login}>
        <Input
          type="email"
          text="Email"
          name="email"
          handleChange={handleChange}
        />
        <Input
          name="password"
          type={visible ? "text" : "password"}
          icon={visible ? <MdVisibility /> : <MdVisibilityOff />}
          text="Password"
          handleClick={handleClick}
          handleChange={handleChange}
        />
        <div className="login_btn">
          <button type="submit" className="btn-primary">
            sign in with 
            <img src="./assets/img/iX.svg" alt="iX" className="btn-icon" />
          </button>
          <button type="button" className="btn-alt" onClick={handleGoogleClick}>
            sign in with <FcGoogle />
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;
