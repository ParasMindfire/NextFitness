"use client";

import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "../services/UserAPI";
import { useUserStore } from "../app/store/useUserStore";
import { LoginFormData } from "@/app/types";
import { showToast } from "@/utils/Toast";
import ErrorMessage from "./ErrorMessage";
import LoadingButton from "./LoadingButton";

const LoginForm = () => {
  const setUser = useUserStore((state: any) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError("");
    try {
      const result = await loginUser(data);

      if (result.message === "Login successful") {
        localStorage.setItem("accessToken", result.accessToken);
        setUser(result.user);
        router.push("/");
        showToast("Login Successfully", "success");
      } else {
        setError(result.message);
        showToast("Login Failed", "error");
      }
    } catch (error) {
      showToast("Login Failed", "error");
    }

    setLoading(false);
  };

  return (
    <>
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

        {error && <ErrorMessage message={error} />}

        <LoadingButton loading={loading} type="submit">
          {loading ? "Logging in..." : "LOGIN"}
        </LoadingButton>
      </form>
      <LoadingButton loading={false} onClick={() => router.push("/")} className="mt-4">
        BACK TO LANDING
      </LoadingButton>
    </>
  );
};

export default LoginForm;
