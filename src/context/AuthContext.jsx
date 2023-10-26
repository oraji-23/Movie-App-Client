import { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(
    () => JSON.parse(localStorage.getItem("token")) || null
  );
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();

  //   REGISTER

  const handleRegisterUser = async (formData) => {
    setAuthenticating(true);
    // do logic for register
    setTimeout(async () => {
      try {
        const { data } = await axiosInstance.post(
          "/api/auth/register",
          formData
        );

        toast.success("Registration Successful");
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
        setUser({ id: data.id });
        navigate("/");
      } catch (error) {
        if (error.response) {

          return toast.error(error.response.data.message);
        }
        toast.error("Something went wrong");
      } finally {
        setAuthenticating(false);
      }
    }, 2000);
  };

  const handleSignInUser = async (formData) => {
    setAuthenticating(true);
    setTimeout(async () => {
      try {
        const { data } = await axiosInstance.post("/api/auth/login", formData);

        toast.success("Welcome Back!");
        localStorage.setItem("token", JSON.stringify(data.token));
        setToken(data.token);
        setUser({ id: data.id });
        navigate("/");
      } catch (error) {
        if (error.response) {
          
          return toast.error(error.response.data.message);
        }
        toast.error("Something went wrong");
      } finally {
        setAuthenticating(false);
      }
    }, 2000);
  };

  const handleGetUser = async () => {
    try {
      const { data } = await axiosInstance.post(
        "/api/auth/user",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      setUser(data);
    } catch (error) {
      
      if (error.message === "Network Error") {
      }
    }
  };

  const handleLogOutUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    toast.success("LogOut Successfully")
    navigate("/");
  };

  const contextData = {
    user,
    token,
    handleRegisterUser,
    handleSignInUser,
    authenticating,
    handleGetUser,
    handleLogOutUser,
  };
  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
