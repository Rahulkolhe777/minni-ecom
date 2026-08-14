import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

export const useAuthHook = () => {
  const navigate = useNavigate();
   const {registeredUser,
          setRegisteredUser,
          loggedInUser,
          setLoggedInUser,} = useContext(Auth)
            

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let loginFormSubmit = (data) => {
    let user = registeredUser.find((val) => {
      return val.email === data.email && val.password === data.password;
    });
    reset();
    if (!user) {
      toast.error("user not found or invalid credentials");
      return;
    }
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser=>", JSON.stringify(user));
    toast.success("user logged in");
    navigate("/main");
  };

  let registerFormSubmit = (data) => {
    let arr = [...registeredUser, data];
    setRegisteredUser(arr);
    toast.success("registered sucessfully");
    console.log("registered user", arr);
    navigate("/");
    localStorage.setItem("registeredUser", JSON.stringify(arr));
    reset();
  };

  return {
    register,
    handleSubmit,
    reset,
    errors,
    loginFormSubmit,navigate,
    registerFormSubmit,toast
  };
};
