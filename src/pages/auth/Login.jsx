import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import useEcomStore from "../../store/ecom-store";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const actionLogin = useEcomStore((state) => state.actionLogin);
  const user = useEcomStore((state) => state.user);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await actionLogin(form);
      const role = res.data.payload.role;
      roleRedirect(role);
      toast.success("Welcom Back");
    } catch (err) {
      console.log(err);
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
    }
  };

  const roleRedirect = (role) => {
    if (role === "admin") {
      navigate("/admin");
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent`}
              onChange={handleOnChange}
            />
            
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent`}
              onChange={handleOnChange}
            />
            <button  className="bg-blue-500 px-2 py-2 font-medium rounded-md shadow text-white hover:bg-blue-700 w-full">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
