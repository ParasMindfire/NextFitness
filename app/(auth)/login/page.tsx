"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "../../../services/UserAPI"; // Import server action
import { useUserStore } from "../../store/useUserStore";
import { useState } from "react";
import { LoginFormData } from "@/app/types";
import { showToast } from "@/utils/Toast";

const Login = () => {
  const setUser = useUserStore((state: any) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");
    try {
      const result = await loginUser(data); // Call server action

      console.log("login api response ", result);

      if ((result.message = "Login successful")) {
        localStorage.setItem("accessToken",result.accessToken);
        setUser(result.user);
        router.push("/");
        showToast("Login Successfully", "success");
      } else {
        console.log("aya error ?");
        setError(result.message);
        showToast("Login Failed", "error");
      }
    } catch (error) {
      showToast("Login Failed", "error");
    }
    

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-tertiary">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md mt-[-150px]">
        <h2 className="text-2xl font-bold text-primary text-center mb-4">
          Login
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.email && (
            <p className="text-error text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {errors.password && (
            <p className="text-error text-sm">{errors.password.message}</p>
          )}

          {error && <p className="text-error text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full cursor-pointer ${
              loading
                ? "bg-secondary cursor-not-allowed"
                : "bg-primary hover:bg-hover"
            } text-white font-bold py-2 rounded-lg transition duration-200`}
          >
            {loading ? "Logging in..." : "LOGIN"}
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

export default Login;
