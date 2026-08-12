import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();
   const {registeredUser,
          
          loggedInUser,
          setLoggedInUser,} = useContext(Auth)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  let formSubmit = (data) => {
    let user = registeredUser.find((val)=>{
      return val.email === data.email && val.password === data.password
    })
    reset();
    if(!user){
       toast.error("user not found or invalid credentials")
       return
    }
    setLoggedInUser(user)
    localStorage.setItem("loggedInUser=>",JSON.stringify(user))
     toast.success("user logged in")
    navigate("/main")
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white flex">
      {/* LEFT SECTION */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between px-14 py-14 border-r border-white/20 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute -left-20 top-1/2 w-96 h-96 bg-[#c6ff00]/10 blur-[120px] rounded-full" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#c6ff00] flex items-center justify-center">
            <span className="text-black text-2xl font-black">ϟ</span>
          </div>

          <h1 className="text-2xl font-bold tracking-tight">
            Sky<span className="text-[#c6ff00]">Mart</span>
          </h1>
        </div>

        {/* Hero */}
        <div className="relative max-w-xl">
          <p className="text-[#c6ff00] text-sm font-bold tracking-widest mb-7">
            WELCOME BACK
          </p>

          <h2 className="text-5xl xl:text-6xl font-semibold leading-[1.08] tracking-tight">
            Shop the future.
            <br />
            <span className="text-[#c6ff00]">Today.</span>
          </h2>

          <p className="mt-8 text-lg text-gray-500 leading-relaxed max-w-lg">
            Thousands of products, lightning-fast delivery, and prices that make
            your wallet happy.
          </p>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-3 gap-4 max-w-2xl">
          <div className="h-24 rounded-2xl border border-white/60 flex flex-col items-center justify-center">
            <span className="text-[#c6ff00] text-xl font-bold">20K+</span>

            <span className="text-gray-500 text-sm mt-1">Products</span>
          </div>

          <div className="h-24 rounded-2xl border border-white/60 flex flex-col items-center justify-center">
            <span className="text-[#c6ff00] text-xl font-bold">50K+</span>

            <span className="text-gray-500 text-sm mt-1">Users</span>
          </div>

          <div className="h-24 rounded-2xl border border-white/60 flex flex-col items-center justify-center">
            <span className="text-[#c6ff00] text-xl font-bold">4.9★</span>

            <span className="text-gray-500 text-sm mt-1">Rating</span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-131.25">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-xl bg-[#c6ff00] flex items-center justify-center">
              <span className="text-black text-xl font-black">ϟ</span>
            </div>

            <h1 className="text-2xl font-bold">
              Sky<span className="text-[#c6ff00]">Mart</span>
            </h1>
          </div>

          {/* LOGIN CARD */}
          <div className="border border-white/10 rounded-[28px] bg-[#111111] px-10 py-11 shadow-2xl">
            {/* Heading */}
            <div className="mb-9">
              <h2 className="text-3xl font-semibold">Sign in</h2>

              <p className="text-gray-500 mt-2">
                Enter your credentials to continue
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit(formSubmit)}>
              {/* EMAIL */}
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

              {/* PASSWORD */}
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

              {/* SIGN IN */}
              <button
                type="submit"
                className="w-full h-14 rounded-2xl bg-[#c6ff00] text-black font-semibold text-lg hover:bg-[#b8f000] active:scale-[0.99] transition flex items-center justify-center gap-3"
              >
                Sign in
                <span className="text-2xl leading-none">→</span>
              </button>
            </form>

            {/* REGISTER */}
            <p className="text-center text-gray-500 mt-8">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/register")}
                className="text-[#c6ff00] font-semibold hover:underline"
              >
                Create one
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
