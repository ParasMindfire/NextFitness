"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signupUser } from "../../../services/UserAPI";
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";
import { SignupFormData } from "@/app/types";
import { showToast } from "@/utils/Toast";
// import { showToast } from '../../helpers/ToastHelper';
// import { SIGNUP, BACK_TO_LANDING } from '../../constants';

const Signup = () => {
  const { setUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    setLoading(true);
    setError("");

    console.log("signup data ", data);

    try {
      const result = await signupUser(data); // Call server action

      console.log("result of signup ", result);

      if (result.message == "User Registered Successfully") {
        setUser(result.user);
        router.push("/");
        showToast("Signup Successful","success");
      } else {
        setError(result.message);
        showToast("Signup Failed","error");
      }
    } catch (error) {
      showToast("Signup Failed","error");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-tertiary">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-[-150px]">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">
          Create an Account
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.name && (
            <p className="text-error text-sm">{errors.name.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}

          <input
            type="text"
            placeholder="Phone Number"
            {...register("phone", { required: "Phone number is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.phone && (
            <p className="text-error text-sm">{errors.phone.message}</p>
          )}

          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: "Address is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {errors.address && (
            <p className="text-error text-sm">{errors.address.message}</p>
          )}

          {error && <p className="text-error text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="cursor-pointer w-full bg-primary hover:bg-secondary text-white font-bold py-2 rounded-lg transition duration-200"
          >
            SIGNUP
          </button>
        </form>

        <button
          onClick={() => router.push("/")}
          className="cursor-pointer w-full mt-4 bg-tertiary hover:bg-hover hover:text-white text-secondary font-bold py-2 rounded-lg transition duration-200"
        >
          BACK TO LANDING
        </button>
      </div>
    </div>
  );
};

export default Signup;
