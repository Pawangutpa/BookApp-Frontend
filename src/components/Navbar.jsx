import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingCart } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { CiHeart } from "react-icons/ci";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
  { name: "dashboard", href: "/dashboard" },
  { name: "orders", href: "/orders" },
  { name: "cart page", href: "/cart" },
  { name: "check out", href: "/checkout" },
];

const Navbar = () => {
  const [isdropdownopen, setisdropdownopen] = useState(false);
  const {currentUser,logout} = useAuth();
  const cartitem = useSelector((state) => state.cart.cartitem);
  const handleLogOut=()=>{
    logout()
  }

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-7">
      <nav className="flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          <Link to="/">
            <HiMiniBars3CenterLeft className="w-6 h-6" />
          </Link>
          <div className="relative sm:w-72 w-40 space-x-2">
            <IoSearchOutline className="w-6 h-6 absolute left-3 inset-y-2" />
            <input
              type="text"
              placeholder="what are you looking for ?"
              className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setisdropdownopen(!isdropdownopen)}>
                  <img
                    src={avatarImg}
                    alt="login-image"
                    className={`w-7 h-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </button>
                {/* Dropdown */}
                {isdropdownopen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                    <ul className="py-2">
                      {navigation.map((item) => (
                        <li
                          key={item.name}
                          onClick={() => {
                            setisdropdownopen(false);
                          }}
                        >
                          <Link
                            to={item.href}
                            className="block px-4 py-2 text-sm hover:bg-gray-100"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <button onClick={handleLogOut} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100">
                             LogOut 
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="w-6 h-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <CiHeart className="w-6 h-6" />
          </button>
          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart className="w-6 h-6" />
            {cartitem.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartitem.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
