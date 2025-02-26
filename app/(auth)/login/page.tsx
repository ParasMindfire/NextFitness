// import { useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
// import { useUserContext } from '../../contexts/UserContext';
// import { login } from '../../services/UserAPI';
// import { showToast } from '../../helpers/ToastHelper';
// import { LOGIN, BACK_TO_LANDING } from '../../constants';

import Link from "next/link";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  // const { setUser } = useUserContext();
  // const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<LoginFormData>();

  // const onSubmit = async (data: LoginFormData) => {
  //   try {
  //     const response: any = await login(data);
  //     if (response.status === 200) {
  //       setUser(response.user);
  //       localStorage.setItem("accessToken", response.accessToken);
  //       localStorage.setItem("refreshToken", response.refreshToken);
  //       showToast("Login Successful", "success");
  //       navigate("/");
  //     } else {
  //       showToast("Enter Correct Credentials", "error");
  //     }
  //   } catch (error) {
  //     showToast("Login Failed !!", "error");
  //   }
  // };

  // const handleBack = () => {
  //   navigate("/");
  // };

  return (
    <div className="flex justify-center items-center h-[500px] mt-32 bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            // {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {/* {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>} */}

          <input
            type="password"
            placeholder="Password"
            // {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          {/* {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>} */}

          <button
            type="submit"
            className="w-full cursor-pointer bg-purple-600 hover:bg-gray-800 text-white font-bold py-2 rounded-lg transition duration-200"
          >
            LOGIN
          </button>
        </form>

        <Link href="/">
            <button
            // onClick={handleBack}
              className="cursor-pointer w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition duration-200"
            >
              BACK TO DASHBOARD
            </button>
          </Link>
      </div>
    </div>
  );
};

export default Login;
