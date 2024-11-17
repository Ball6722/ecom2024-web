import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { array, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import zxcvbn from "zxcvbn";
const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid Email!!!" }),
    password: z.string().min(8, { message: "Password ต้องมากกว่า 8 ตัวอักษร" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password == data.confirmPassword, {
    message: "Password มันบ่ตรงกันเด้อ",
    path: ["confirmPassword"],
  });
const Register = () => {
  const [passwordScore, setPasswordScore] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const validatePassword = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  useEffect(() => {
    setPasswordScore(validatePassword());
  }, [watch().password]);

  const onSubmit = async (data) => {
    // const passwordScore = zxcvbn(data.password).score
    // if (passwordScore < 4) {
    //   toast.warning('Password ไม่ Strong!!!')
    //   return
    // }
    try {
      const res = await axios.post("https://ecom2024-api-navy.vercel.app/api/register", data);
      console.log(res.data.message);
      const successMsg = res.data?.message;
      toast.success(successMsg);
    } catch (err) {
      const errMsg = err.response?.data?.message;
      toast.error(errMsg);
      console.log(err);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center
    bg-gray-100
    "
    >
      <div className="w-full shadow-md bg-white p-8 max-w-md">
        <h1 className="text-2xl text-center my-4 font-bold">Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <input
                placeholder="Email"
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent ${errors.email && "border-red-500"}`}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent ${
                  errors.password && "border-red-500"
                }`}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
              {watch().password?.length > 0 && (
                <div className="flex mt-2">
                  {Array.from(Array(5).keys()).map((item, index) => (
                    <span className="w-1/5 px-1" key={index}>
                      <div
                        className={`h-2 rounded-full ${
                          passwordScore <= 2
                            ? "bg-red-500"
                            : passwordScore < 4
                            ? "bg-yellow-500"
                            : "bg-green-500"
                        }`}
                      ></div>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div>
              <input
                type="password"
                placeholder="Confirm Prassword"
                className={`border w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:border-transparent ${
                  errors.confirmPassword && "border-red-500"
                }`}
                {...register("confirmPassword")}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button className="bg-blue-500 px-2 py-2 font-medium rounded-md shadow text-white hover:bg-blue-700 w-full">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
