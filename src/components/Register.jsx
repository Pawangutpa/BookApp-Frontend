import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
const Register = () => {
  const [message, setmessage] = useState("");
  const { registerUser,signInWithGoogle } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //registeruser
  const onSubmit = async (data) => {
    try {
       await registerUser(data.email, data.password);
      alert("user successfully");
    } catch (error) {
      setmessage("please provide a valid email and passward");
      
    }
  };

  

  const handlegooglesign = () => {
    try {
      signInWithGoogle();
      alert("register  using google sign  successfully");
    } catch (error) {
      alert("google sign in failed");
      console.log(error);
    }
  };
  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">please register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="black text-gray-700 text-sm font-bold mb-2 "
              htmlFor="email"
            >
              email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="email address"
              id="email"
              name="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            ></input>
          </div>

          <div className="mb-4">
            <label
              className="black text-gray-700 text-sm font-bold mb-2 "
              htmlFor="password"
            >
              passward
            </label>

            <input
              {...register("password", { required: true })}
              type="password"
              placeholder="password"
              id="password"
              name="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            ></input>
          </div>
          {
                message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
            }
          <div>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none"
              type="submit"
            >
              register
            </button>
          </div>
        </form>
        <p className="align-baseline font-medium mt-4 text-sm">
          have an account ? please
          <Link to="/login" className="text-blue-500 hover:text-blue-700">
            login
          </Link>
        </p>
        {/* //google */}
        <div className="mt-4">
          <button
            className="w-full flex flex-wrap gap-1 item-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
            onClick={handlegooglesign}
          >
            <FaGoogle className="mr-2 mt-1.5" />
            sign in with google
          </button>
        </div>
        <p className="mt-5 text-center text-gray-500 text-xs">
          @2025 book store. all right reserved.
        </p>
      </div>
    </div>
  );
};

export default Register;
