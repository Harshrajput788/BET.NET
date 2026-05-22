import { useQuery } from "@tanstack/react-query";
import type { IUSER } from "../../types/user";
import axios from "axios";

const UserProfileById = () => {

  const {data,isLoading} = useQuery<IUSER>({
    queryKey: ['profile'],
    queryFn: async (): Promise<IUSER> => {
      const res = await axios.get(`https://bet-net-3.onrender.com/api/v1/user/`, { withCredentials: true });
      return await res.data.data as IUSER;
    }
  }) 


  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-orange-500 font-semibold">
        Loading profile...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        User not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-orange-500 h-36"></div>

      <div className="max-w-4xl mx-auto px-4">
        <div className="-mt-20 bg-white rounded-xl shadow-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <img
              src={data.profile.url}
              alt={data.userName}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
            />

            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900">
                {data.firstName} {data.lastName}
                {data.verified && (
                  <span className="ml-2 text-orange-500 text-lg">✔</span>
                )}
              </h1>

              <p className="text-gray-500">@{data.userName}</p>

              <p className="mt-3 text-gray-700 max-w-xl">
                {data.bio || "No bio available"}
              </p>

              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-4 text-sm">
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                  {data.gender}
                </span>
                <span className="px-3 py-1 bg-orange-100 text-orange-600 rounded-full">
                  Age: {data.age}
                </span>
              </div>
            </div>
          </div>

          <div className="my-8 border-t" />

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Email Address
              </h3>
              <p className="text-gray-800">{data.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-500">
                Account Status
              </h3>
              <p
                className={`font-medium ${
                  data.verified ? "text-green-600" : "text-red-500"
                }`}
              >
                {data.verified ? "Verified" : "Not Verified"}
              </p>
            </div>
          </div>

          {/* <div className="mt-8 flex justify-center md:justify-end gap-4">
            <button className="px-5 py-2 rounded-md border border-orange-500 text-orange-500 hover:bg-orange-50 transition">
              Follow
            </button>
            <button className="px-5 py-2 rounded-md bg-orange-500 text-white hover:bg-orange-600 transition">
              Message
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfileById;
