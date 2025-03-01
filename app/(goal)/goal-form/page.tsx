// import { useForm } from "react-hook-form";
// import { useEffect } from "react";
// import { useFitness } from "../../contexts/FitnessContext";
// import { showToast } from "../../helpers/ToastHelper";
// import { useNavigate } from "react-router-dom";
// import {
//   GOAL_TYPE,
//   WEIGHT_LOSS,
//   TARGET_VALUE,
//   CURRENT_PROGRESS,
//   START_DATE,
//   END_DATA,
//   STATUS,
//   PENDING,
//   COMPLETE,
//   INCOMPLETE,
//   UPDATE_GOAL,
//   ADD_GOAL,
//   BACK_TO_DASHBOARD,
// } from "../../constants";

import Link from "next/link";

interface FitnessFormData {
  goal_type: string;
  target_value: number;
  current_progress: number;
  start_date: string;
  end_date: string;
  status: string;
}

const FitnessFormPage = () => {
  //   const {
  //     addFitnessGoal,
  //     editFitnessGoal,
  //     id,
  //     setId,
  //     formData,
  //     setFormData,
  //     fetchFitnessGoals,
  //   } = useFitness();
  //   const navigate = useNavigate();

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   reset,
  //   formState: { errors },
  // } = useForm<FitnessFormData>({
  //   defaultValues: {
  //     goal_type: "weight_loss",
  //     target_value: 0,
  //     current_progress: 0,
  //     start_date: "",
  //     end_date: "",
  //     status: "pending",
  //   },
  // });

  // useEffect(() => {
  //   if (formData) {
  //     reset({
  //       goal_type: formData.goal_type,
  //       target_value: formData.target_value,
  //       current_progress: formData.current_progress,
  //       start_date: formData.start_date,
  //       end_date: formData.end_date || "",
  //       status: formData.status || "pending",
  //     });
  //   }
  // }, [formData, reset]);

  const onSubmit = async (data: FitnessFormData) => {
    // if (data.start_date && data.end_date && new Date(data.end_date) < new Date(data.start_date)) {
    //   showToast("End date cannot be less than start date", "error");
    //   return;
    // }

    try {
      // if (id !== null) {
      //   await editFitnessGoal({ goal_id: id, ...data });
      //   setId(null);
      //   showToast("Goal Edited Successfully", "success");
      // } else {
      //   await addFitnessGoal(data);
      //   showToast("Goal Added Successfully", "success");
      // }
      // setFormData(null);
      // reset({
      //   goal_type: "weight_loss",
      //   target_value: 0,
      //   current_progress: 0,
      //   start_date: "",
      //   end_date: "",
      //   status: "pending",
      // });
      // navigate("/fitnessViews");
      // fetchFitnessGoals();
    } catch (error) {
      // showToast("An error occurred. Please try again!", "error");
    }
  };

  // const handleBack = () => {
  //   navigate("/");
  // };

  return (
    <div className="flex justify-center items-center h-[500px] mt-44">
      <form className="bg-white p-6 rounded-2xl shadow-xl w-[500px] space-y-4">
        <h2 className="text-xl font-semibold mb-4 text-center text-purple-700">
          {/* {id !== null ? "Edit Fitness Goal" : "Add Fitness Goal"} */}
          Add Fitness Goals
        </h2>

        <div>
          <label
            htmlFor="goal_type"
            className="block text-gray-700 font-medium"
          >
            {/* {GOAL_TYPE} */}
            Goal Type
          </label>
          <select
            id="goal_type"
            // {...register("goal_type", { required: "Goal type is required" })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          >
            <option value="weight_loss">WEIGHT LOSS</option>
            <option value="workout_per_week">Workout Per Week</option>
          </select>
          {/* {errors.goal_type && <p className="text-red-500 text-sm">{errors.goal_type.message}</p>} */}
        </div>

        <div>
          <label
            htmlFor="target_value"
            className="block text-gray-700 font-medium"
          >
            TARGET VALUE
          </label>
          <input
            type="number"
            id="target_value"
            placeholder="0"
            // {...register("target_value", {
            //   required: "Target value is required",
            //   validate: (value) => Number(value) > 0 || "Target value must be greater than 0",
            // })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          />
          {/* {errors.target_value && <p className="text-red-500 text-sm">{errors.target_value.message}</p>} */}
        </div>

        <div>
          <label
            htmlFor="current_progress"
            className="block text-gray-700 font-medium"
          >
            {/* {CURRENT_PROGRESS} */}
            CURRENT PROGRESS
          </label>
          <input
            type="number"
            id="current_progress"
            placeholder="0"
            // {...register("current_progress", {
            //   required: "Current progress is required",
            //   valueAsNumber: true,
            //   validate: (value) => value > 0 || "Current progress must be greater than 0",
            // })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          />
          {/* {errors.current_progress && <p className="text-red-500 text-sm">{errors.current_progress.message}</p>} */}
        </div>

        <div>
          <label
            htmlFor="start_date"
            className="block text-gray-700 font-medium"
          >
            {/* {START_DATE} */}
            START DATE
          </label>
          <input
            type="date"
            id="start_date"
            // {...register("start_date", { required: "Start date is required" })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          />
          {/* {errors.start_date && <p className="text-red-500 text-sm">{errors.start_date.message}</p>} */}
        </div>

        <div>
          <label htmlFor="end_date" className="block text-gray-700 font-medium">
            {/* {END_DATA} */}
            END DATE
          </label>
          <input
            type="date"
            id="end_date"
            // {...register("end_date", {
            //   required: "End date is required",
            //   validate: (value) => {
            //     const startDate = watch("start_date");
            //     if (startDate && new Date(value) < new Date(startDate)) {
            //       return "End date cannot be less than start date";
            //     }
            //     return true;
            //   },
            // })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          />
          {/* {errors.end_date && <p className="text-red-500 text-sm">{errors.end_date.message}</p>} */}
        </div>

        <div>
          <label htmlFor="status" className="block text-gray-700 font-medium">
            {/* {STATUS} */}
            STATUS
          </label>
          <select
            id="status"
            // {...register("status", { required: "Status is required" })}
            className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-300"
          >
            <option value="pending">PENDING</option>
            <option value="complete">COMPLETE</option>
            <option value="incomplete">INCOMPLETE</option>
          </select>
          {/* {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>} */}
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-lg transition"
        >
          {/* {id !== null ? UPDATE_GOAL : ADD_GOAL} */}
          ADD GOAL
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

export default FitnessFormPage;
