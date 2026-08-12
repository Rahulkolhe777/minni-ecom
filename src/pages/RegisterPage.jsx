import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const RegisterPage = () => {
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


  let formSubmit = (data) => {
    let arr = [...registeredUser,data]
    setRegisteredUser(arr);
    toast.success('registered sucessfully');
    console.log("registered user=>",arr)
    navigate("/")
    localStorage.setItem("registeredUser", JSON.stringify(arr));
    reset();
    
  };


  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex flex-col items-center px-6 py-14">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-9">
        <div className="w-11 h-11 rounded-xl bg-[#c6ff00] flex items-center justify-center">
          <span className="text-black text-2xl font-black">ϟ</span>
        </div>

        <h1 className="text-2xl font-bold tracking-tight">
          Sky<span className="text-[#c6ff00]">Mart</span>
        </h1>
      </div>

      {/* Register Card */}
      <div className="w-full max-w-131.25 rounded-[28px] border border-white/10 bg-[#111111] px-10 py-10 shadow-2xl">
        {/* Heading */}
        <div className="mb-9">
          <h2 className="text-3xl font-semibold tracking-tight">
            Create account
          </h2>

          <p className="text-gray-500 mt-2">Join SkyMart and start shopping</p>
        </div>
        <form onSubmit={handleSubmit(formSubmit)}>
          {/* Full Name */}
          <div className="mb-5">
            <div className="flex items-center h-13.5 px-4 rounded-2xl bg-[#1d1d1d] border border-white/10 focus-within:border-[#c6ff00]/60 transition">
              <svg
                className="w-5 h-5 text-gray-600 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>

              <input
                {...register("name", {
                  required: "name is required",
                })}
                type="text"
                placeholder="Full name"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-600"
              />
              {errors.name && <p>{errors.name.message}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <div className="flex items-center h-13.5 px-4 rounded-2xl bg-[#1d1d1d] border border-white/10 focus-within:border-[#c6ff00]/60 transition">
              <svg
                className="w-5 h-5 text-gray-600 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l9 6 9-6"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>

              <input
                {...register("email", {
                  required: "email is required",
                })}
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-600"
              />
              {errors.email && <p>{errors.email.message}</p>}
            </div>
          </div>

          {/* Password */}
          <div className="mb-5">
            <div className="flex items-center h-13.5 px-4 rounded-2xl bg-[#1d1d1d] border border-white/10 focus-within:border-[#c6ff00]/60 transition">
              <svg
                className="w-5 h-5 text-gray-600 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 11V7a6 6 0 0112 0v4"
                />

                <rect
                  x="4"
                  y="11"
                  width="16"
                  height="10"
                  rx="2"
                  strokeWidth="2"
                />
              </svg>

              <input
                {...register("password", {
                  required: "password is required",
                  minLength: {
                    value: 6,
                    message: "minimum 6 characters required",
                  },
                })}
                type="password"
                placeholder="Password (min 6 chars)"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-600"
              />
              {errors.password && <p>{errors.password.message}</p>}

              {/* Eye Icon */}
              {/* <button className="text-gray-600 hover:text-gray-300 transition">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button> */}
            </div>
          </div>

          {/* Confirm Password */}
          <div className="mb-5">
            <div className="flex items-center h-13.5 px-4 rounded-2xl bg-[#1d1d1d] border border-white/10 focus-within:border-[#c6ff00]/60 transition">
              <svg
                className="w-5 h-5 text-gray-600 mr-3 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 11V7a6 6 0 0112 0v4"
                />

                <rect
                  x="4"
                  y="11"
                  width="16"
                  height="10"
                  rx="2"
                  strokeWidth="2"
                />
              </svg>

              <input
                {...register("password", {
                  required: "password is very important",
                })}
                type="password"
                placeholder="Confirm password"
                className="w-full bg-transparent outline-none text-white placeholder:text-gray-600"
              />
            </div>
          </div>

          {/* Create Account Button */}
          <button className="w-full h-15 rounded-2xl bg-[#c6ff00] text-black font-semibold text-lg flex items-center justify-center gap-3 hover:bg-[#baff00] active:scale-[0.99] transition">
            Create Account
            <span className="text-2xl">→</span>
          </button>
        </form>
        {/* Sign In */}
        <p className="text-center text-gray-500 mt-8">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-[#c6ff00] font-semibold hover:underline"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
