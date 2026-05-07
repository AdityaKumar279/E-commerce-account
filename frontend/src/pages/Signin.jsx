import React, { useContext, useState } from "react";
import { assets } from "../assets/frontend_assets/assets";
import { StoreContext } from "../store/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

function Signin() {
  const { token, setToken, navigator, backendUri } = useContext(StoreContext);
  const [loading, setLoading] = useState(false) 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true)
      const payload = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      };
      // axios.defaults.withCredentials = true
      const response = await axios.post(
        `${backendUri}/api/users/register`,
        payload,
      );
      if (response.data.success) {
         localStorage.setItem("token", response.data.user.token);
        toast.success(response.data.message);
        navigator('/login')
      } else {
        toast.error(response.data.message)
        
      }
    } catch (error) {
      
      toast.error(error.response.data.message)
      
    }finally{
      setLoading(false)

    }
  };


  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full">
        <div className="bg-white shadow-md rounded-lg px-8 py-6 max-w-md">
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold mb-4">Sign in </h1>
            <div onClick={() => navigator("/")} className="cursor-pointer">
              <img className="h-5 " src={assets.cross_icon} alt="" />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className=" mb-3 min-w-72">
              <p className="text-sm font-medium text-gray-700 mb-2">Username</p>
              <input
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </div>
            <div className=" mb-3 min-w-72">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Email Address
              </p>
              <input
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@gmail.com"
                required
              />
            </div>
            <div className=" mb-3 min-w-72">
              <p className="text-sm font-medium text-gray-700 mb-2">password</p>
              <input
                className="rounded-md w-full px-3 py-2 border border-gray-300 outline-none"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              className=" cursor-pointer mt-2 w-full py-2 px-4 rounded-md text-white bg-black"
              type="submit"
            >
              {loading ? "loading" : "register"}
            </button>
            <div className="pt-4 text-center">
              <p>
                {" "}
                Already have an account? :{" "}
                <span
                  onClick={() => navigator("/login")}
                  className="text-blue-600 cursor-pointer"
                >
                  Click Here
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signin;
