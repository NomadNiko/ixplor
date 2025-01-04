import { useGoogleLogin } from '@react-oauth/google';
import { useContext, useState } from "react";
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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info using access token
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });

        // Send user info to your backend
        const res = await axios.post("/api/auth/google_signing", {
          email: userInfo.data.email,
          name: userInfo.data.name,
          picture: userInfo.data.picture
        });

        localStorage.setItem("_appSignging", true);
        dispatch({ type: "SIGNING" });
        toast(res.data.msg, {
          className: "toast-success",
          bodyClassName: "toast-success",
        });
      } catch (err) {
        toast(err.response?.data?.msg || "Google sign-in failed", {
          className: "toast-failed",
          bodyClassName: "toast-failed",
        });
      }
    },
    onError: () => {
      toast("Google Sign-In failed. Please try again.", {
        className: "toast-failed",
        bodyClassName: "toast-failed",
      });
    }
  });

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
          <button 
            type="button" 
            className="btn-alt" 
            onClick={() => googleLogin()}
          >
            sign in with <FcGoogle />
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;