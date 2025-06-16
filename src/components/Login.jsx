import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [message, setMessage] = useState("");
  const { loginUser, signInWithGoogle } = useAuth();  
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      alert("Successfully logged in!");
      navigate("/"); 
    } catch (error) {
      setMessage("Please provide a valid email and password");
      
    }
  };

  const handleGoogleSign = async () => {
    try {
      await signInWithGoogle();
      navigate("/"); 
    } catch (error) {
      alert("Google sign-in failed");
      console.log(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Please login</h2>

        {message && <p className="text-red-500">{message}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Email address"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="Password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none" type="submit">
            Login
          </button>
        </form>

        <p className="align-baseline font-medium mt-4 text-sm">
          Don't have an account?  
          <Link to="/register" className="text-blue-500 hover:text-blue-700"> Register</Link>
        </p>

        {/* Google Sign-In */}
        <div className="mt-4">
          <button className="w-full flex items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            onClick={handleGoogleSign}>
            <FaGoogle className="mr-2 mt-1.5" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-5 text-center text-gray-500 text-xs">
          @2025 Book Store. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
