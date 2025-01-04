import { useGoogleLogin } from '@react-oauth/google';
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

  // Log environment variables at component load
  useEffect(() => {
    console.log('Environment Variables:');
    console.log('Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID);
    console.log('Google Redirect URI:', process.env.REACT_APP_GOOGLE_REDIRECT_URI);
  }, []);

  const googleLogin = useGoogleLogin({
    flow: 'auth-code',
    onSuccess: (codeResponse) => {
      // Ensure redirect URI is defined and encoded
      const redirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI || window.location.origin;
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

      if (!redirectUri) {
        console.error('Redirect URI is undefined');
        toast.error('Google Sign-In configuration error');
        return;
      }

      const encodedRedirectUri = encodeURIComponent(redirectUri);

      // Construct the full Google OAuth URL
      const googleOAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20email%20profile&redirect_uri=${encodedRedirectUri}&access_type=offline&prompt=consent`;
      
      console.log('Google OAuth URL:', googleOAuthUrl);
      
      // Redirect to Google OAuth
      window.location.href = googleOAuthUrl;
    },
    onError: (errorResponse) => {
      console.error('Google Login Error:', errorResponse);
      toast.error("Google Sign-In failed. Please try again.");
    }
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    setVisible(!visible);
  };

  const login = async (e) => {
    e.preventDefault();

    if (isEmpty(email) || isEmpty(password)) {
      return toast.error("Please fill in all fields.");
    }

    if (!isEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }

    try {
      const res = await axios.post("/api/auth/signing", { email, password });
      localStorage.setItem("_appSignging", true);
      dispatch({ type: "SIGNING" });
      toast.success(res.data.msg || "Login successful");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Login failed");
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
            onClick={() => {
              console.log('Google login clicked');
              googleLogin();
            }}
          >
            sign in with <FcGoogle />
          </button>
        </div>
      </form>
    </>
  );
};

export default Login;