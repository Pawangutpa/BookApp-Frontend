import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Swal from "sweetalert2";
import { useCreateOrderMutation } from "../../redux/feature/orders/orders.Api";

const CheckoutPage = () => {
  const cartitem = useSelector((state) => state.cart.cartitem) || [];
  const totalprice = cartitem.length
    ? cartitem.reduce((acc, item) => acc + item.newPrice, 0).toFixed(2)
    : "0.00";

    const {currentUser}=useAuth()
 
  const { register, handleSubmit,watch, formState: { errors } } = useForm();
 
  const [createOrder,{isLoading,error}]=useCreateOrderMutation();
 
  const navigate=useNavigate();


  const [isChecked, setIsChecked] = useState(false);

  const onSubmit = async (data) => {
    const newOrder = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: {
        city: data.city,
        country: data.country,
        state: data.state,
        zipcode: data.zipcode,
      },
      productIds: cartitem.map((item) => item?._id),
      totalprice: totalprice,
    };
    try{
       await createOrder(newOrder).unwrap();
       Swal.fire({
        title: "confirm Order",
        text: "Your order placed successfully !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, it's okay!"
      })

    navigate("/orders")
    }catch(error){
    console.error("error",error)
    alert("Failed to place an order")
    }
  };

  const onCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };
  if(isLoading){
    return <div> Loading....</div>
  }

  return (
    <>
      <section>
        <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
          <div className="container max-w-screen-lg mx-auto">
            <div>
              <h2 className="font-semibold text-xl text-gray-600 mb-2">
                cash on delivery
              </h2>
              <p className="text-gray-500 mb-2">Total Price: ${totalprice}</p>
              <p className="text-gray-500 mb-6">
                items: {cartitem.length > 0 ? cartitem.length : 0}
              </p>
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3 my-8"
                >
                  <div className="text-gray-600">
                    <p className="font-medium text-lg">personal details</p>
                    <p>please fill out all the fields.</p>
                  </div>

                  <div className="lg:col-span-2">
                    <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                      <div className="md:col-span-5">
                        <label htmlFor="name">full name</label>
                        <input
                          type="text"
                          id="name"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("name", { required: "Full name is required" })}
                          placeholder=""
                        />
                        {/* {errors.name && (
                          <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                        )} */}
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="email">email address</label>
                        <input
                          type="text"
                          id="email"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          defaultValue={currentUser?.email}
                          {...register("email", { required: "Email is required" })}
                          disabled
                        />
                      </div>

                      <div className="md:col-span-5">
                        <label htmlFor="phone">phone number</label>
                        <input
                          type="number"
                          id="phone"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("phone", { required: "Phone number is required" })}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-3">
                        <label htmlFor="city">City</label>
                        <input
                          type="text"
                          id="city"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("city", { required: "City is required" })}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="country">country / region</label>
                        <input
                          type="text"
                          id="country"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("country", { required: "Country is required" })}
                          placeholder=""
                        />
                        {/* {errors.country && (
                          <p className="text-red-500 text-xs mt-1">{errors.country.message}</p>
                        )} */}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="state">state / province</label>
                        <input
                          type="text"
                          id="state"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("state", { required: "State is required" })}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
                        )}
                      </div>

                      <div className="md:col-span-1">
                        <label htmlFor="zipcode">zipcode</label>
                        <input
                          type="text"
                          id="zipcode"
                          className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                          {...register("zipcode", { required: "Zipcode is required" })}
                          placeholder=""
                        />
                        {/* {errors.zipcode && (
                          <p className="text-red-500 text-xs mt-1">{errors.zipcode.message}</p>
                        )} */}
                      </div>

                      <div className="md:col-span-5 mt-3">
                        <div className="inline-flex items-center">
                          <input
                          type="checkbox"
                          id="billing_same"
                          className="form-checkbox"
                        //   
                        onChange={(e) => setIsChecked(e.target.checked)}
                          />
                          <label htmlFor="billing_same" className="ml-2">
                            I agree to the{" "}
                            <Link className="underline text-blue-600">terms & conditions</Link>{" "}
                            and{" "}
                            <Link className="underline text-blue-600">shopping policy</Link>.
                          </label>
                        </div>
                      </div>

                      <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          disabled={!isChecked}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Place an Order
                        </button>
                      </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CheckoutPage;
