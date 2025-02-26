// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
// import { useWorkout } from "../../contexts/WorkoutContext";
// import { createWorkout, updateWorkout } from "../../services/WorkoutAPI";
// import { showToast } from "../../helpers/ToastHelper";
// import { useNavigate } from "react-router-dom";
// import {
//   ADD_WORKOUT_PAGE,
//   EDIT_WORKOUT_PAGE,
//   EXERCISE_TYPE,
//   DURATION,
//   CALORIES_BURNED,
//   WORKOUT_DATE,
//   UPDATE_WORKOUT,
//   BACK_TO_DASHBOARD,
// } from "../../constants";

import Link from "next/link";

interface WorkoutFormData {
  exercise_type: string;
  duration: number;
  calories_burned: number;
  workout_date: string;
}

const WorkoutFormPage = () => {
  // const { formData, setFormData, fetchWorkouts, id } = useWorkout();
  // const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   reset,
  //   formState: { errors },
  // } = useForm<WorkoutFormData>({
  //   defaultValues: {
  //     exercise_type: "",
  //     duration: undefined,
  //     calories_burned: undefined,
  //     workout_date: "",
  //   },
  // });

  // Populate the form when formData is available (for editing)
  // useEffect(() => {
  //   if (formData) {
  //     reset({
  //       exercise_type: formData.exercise_type,
  //       duration: formData.duration,
  //       calories_burned: formData.calories_burned,
  //       workout_date: formData.workout_date,
  //     });
  //   }
  // }, [formData, reset]);

  const onSubmit = async (data: WorkoutFormData) => {
    // Validate numeric fields are greater than 0
    if (data.duration <= 0) {
      // showToast("Duration must be greater than 0", "error");
      return;
    }
    if (data.calories_burned <= 0) {
      // showToast("Calories burned must be greater than 0", "error");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      // if (formData) {
      //   await updateWorkout(token, {
      //     ...data,
      //     workout_id: id,
      //   });
      //   showToast("Workout Updated Successfully", "success");
      // } else {
      //   await createWorkout(token, data);
      //   showToast("Workout Added Successfully", "success");
      // }

    //   setFormData(null);
    //   reset({
    //     exercise_type: "",
    //     duration: undefined,
    //     calories_burned: undefined,
    //     workout_date: "",
    //   });

    //   navigate("/workoutViews");
    //   fetchWorkouts();
    } catch (error) {
    //   showToast("An error occurred. Please try again!", "error");
    }
  };

  const handleBack = () => {
    // navigate("/");
  };

  return (
    <div className="mt-32">
      <form
        // onSubmit={handleSubmit(onSubmit)}
        className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg border border-gray-200 space-y-3"
      >
        <h2 className="text-xl font-semibold text-purple-700 text-center mb-4">
          {/* {formData ? EDIT_WORKOUT_PAGE : ADD_WORKOUT_PAGE} */}
          ADD WORKOUT PAGE
        </h2>

        {/* Exercise Type Dropdown */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {/* {EXERCISE_TYPE} */}
            EXCERCISE TYPE
          </label>
          <select
            id="exercise_type"
            // {...register("exercise_type", { required: "Exercise type is required" })}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-300 focus:outline-none"
          >
            <option value="">Select exercise type</option>
            <option value="chest">Chest</option>
            <option value="back">Back</option>
            <option value="legs">Legs</option>
            <option value="shoulders">Shoulders</option>
            <option value="arms">Arms</option>
            <option value="cardio">Cardio</option>
            <option value="abs">Abs</option>
          </select>
          {/* {errors.exercise_type && (
            <p className="text-red-500 text-sm">{errors.exercise_type.message}</p>
          )} */}
        </div>

        {/* Duration Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {/* {DURATION} */}
            DURATION
          </label>
          <input
            type="number"
            // {...register("duration", {
            //   required: "Duration is required",
            //   min: { value: 1, message: "Duration must be greater than 0" },
            // })}
            placeholder="0"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />
          {/* {errors.duration && (
            <p className="text-red-500 text-sm">{errors.duration.message}</p>
          )} */}
        </div>

        {/* Calories Burned Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {/* {CALORIES_BURNED} */}
            CALORIES BURNED
          </label>
          <input
            type="number"
            // {...register("calories_burned", {
            //   required: "Calories burned is required",
            //   min: { value: 1, message: "Calories burned must be greater than 0" },
            // })}
            placeholder="0"
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />
          {/* {errors.calories_burned && (
            <p className="text-red-500 text-sm">{errors.calories_burned.message}</p>
          )} */}
        </div>

        {/* Workout Date Input */}
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            {/* {WORKOUT_DATE} */}
            WORKOUT DATE
          </label>
          <input
            type="date"
            // {...register("workout_date", {
            //   required: "Workout date is required",
            // })}
            className="w-full p-3 border rounded-md focus:ring-2 focus:ring-purple-300 focus:outline-none"
          />
          {/* {errors.workout_date && (
            <p className="text-red-500 text-sm">{errors.workout_date.message}</p>
          )} */}
        </div>

        <button
          type="submit"
          className="cursor-pointer mt-5 w-full bg-purple-600 hover:bg-gray-800 text-white text-lg font-medium py-3 rounded-md transition-all"
        >
          {/* {formData ? UPDATE_WORKOUT : ADD_WORKOUT_PAGE} */}
          ADD WORKOUT
        </button>

        <Link href="/">
            <button
            // onClick={handleBack}
              className="cursor-pointer w-full mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 rounded-lg transition duration-200"
            >
              BACK TO DASHBOARD
            </button>
          </Link>
      </form>
    </div>
  );
};

export default WorkoutFormPage;
