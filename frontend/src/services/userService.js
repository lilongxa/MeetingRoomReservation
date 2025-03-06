
import axiosInstance from "../utils/axios";

// export const userService = {
//   create: async () => {
//     try {
//       const response = await axiosInstance.post("/users/create", user);
//       return response;
//     } catch (error) {
//       return error.response.data;
//     }
//   }
// };

export const create = async (user) => {
  try {
    const response = await axiosInstance.post("/users/create", user);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const update = async (user) => {
  try {
    const response = await axiosInstance.post("/users/update", user);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const remove = async (id) => {
  try {
    const response = await axiosInstance.delete("/users/"+id);
    return response;
  } catch (error) {
    return error.response.data;
  }
}