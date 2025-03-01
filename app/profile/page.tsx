// import { useEffect, useState } from 'react';
// import { getSingleUSer } from '../../services/UserAPI';
// import { User } from '../../interfaces/UserInterface';
// import { WorkoutDurationStats } from '../StatsPages/WorkoutDurationStat';
// import { WorkoutCaloriesStats } from '../StatsPages/WorkoutCalorieStat';
// import { uploadUserPhoto } from '../../services/WorkoutAPI';

const ProfilePage = () => {
  //   const [user, setUser] = useState<User | null>(null);

  //   useEffect(() => {
  //     fetchUser();
  //   }, []);

  //   const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const file = event.target.files?.[0];
  //     if (!file) return;

  //     try {
  //       const data = await uploadUserPhoto(file, user!.email);
  //       console.log('Photo uploaded successfully:', data);
  //       setUser((prevUser) => prevUser ? { ...prevUser, profile_pic: data.profilePic } : null);
  //     } catch (error) {
  //       console.error('Error uploading photo:', error);
  //     }
  //   };

  //   const fetchUser = async () => {
  //     try {
  //       const incomeingUser = await getSingleUSer();
  //       setUser(incomeingUser);
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     }
  //   };

  return (
    <div className="p-4 space-y-4 bg-gray-100 min-h-screen">
      <div className="flex flex-col md:flex-row border rounded-2xl shadow-lg p-4 h-[35vh] space-y-4 md:space-y-0">
        <div className="flex justify-center items-center w-full md:w-1/6 p-4 bg-purple-400 mr-2">
          <label htmlFor="photo-upload" className="cursor-pointer relative">
            {/* {user?.profile_pic ? ( */}
            {/* <img
                // src={`/uploads/${user?.profile_pic}`}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-600"
              /> */}
            {/* ) : ( */}
            <div className="w-32 h-32 rounded-full border-4 border-dashed border-purple-600 flex items-center justify-center hover:bg-purple-100">
              <span className="text-sm text-gray-500">Upload Photo</span>
            </div>
            {/* )} */}
            <input
              id="photo-upload"
              type="file"
              className="hidden"
              //   onChange={handlePhotoUpload}
            />
          </label>
        </div>

        <div className="w-full md:w-2/6 pt-10 pl-5 bg-purple-300 mr-2">
          <h2 className="text-xl font-bold text-purple-700 mb-2">
            User Details
          </h2>
          <div className="space-y-1 text-gray-700">
            <p>
              <strong>Name:</strong>
            </p>
            <p>
              <strong>Email:</strong>
            </p>
            <p>
              <strong>Phone:</strong>
            </p>
            <p>
              <strong>Address:</strong>
            </p>
          </div>
        </div>

        <div className="w-full md:w-3/6 p-4 border-l border-gray-200 bg-purple-200">
          <h2 className="text-xl font-bold text-purple-700 mb-2">
            Additional Info
          </h2>
          <div className="space-y-1 text-gray-700">
            <p>
              <strong>Membership:</strong> Premium
            </p>
            <p>
              <strong>Joined:</strong> Jan 2023
            </p>
            <p>
              <strong>Goals:</strong> Weight Loss, Strength
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row border rounded-2xl shadow-lg p-4 space-y-4 md:space-y-0">
        <div className="w-full md:w-1/2 p-4 border-r border-gray-200 overflow-auto">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">
            Workout Duration Stats
          </h3>
          {/* <WorkoutDurationStats /> */}
        </div>

        <div className="w-full md:w-1/2 p-4 overflow-auto">
          <h3 className="text-lg font-semibold text-purple-700 mb-2">
            Workout Calories Stats
          </h3>
          {/* <WorkoutCaloriesStats /> */}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
