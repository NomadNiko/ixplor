import { useParams, useNavigate } from "react-router-dom";
import "./activatelayout.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

const ActivateLayout = () => {
  const { activation_token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (activation_token) {
      const activateUser = async () => {
        try {
          const res = await axios.post("/api/auth/activation", {
            activation_token,
          });
          toast(res.data.msg, {
            className: "toast-success",
            bodyClassName: "toast-success",
            autoClose: 2500,
          });
        } catch (err) {
          console.log(err);
          toast(err.response.data.msg, {
            className: "toast-failed",
            bodyClassName: "toast-failed",
          });
        }
      };
      activateUser();
    }
  }, [activation_token]);

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="activate">
      <ToastContainer />
      <p>
        ready to login ? 👉🏻 <span onClick={handleClick}>Here</span>
      </p>
    </div>
  );
};

export default ActivateLayout;