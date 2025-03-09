
import axiosInstance from "../utils/axios";

export const create = async (reservation) => {
  try {
    const response = await axiosInstance.post("/reservations/create", reservation);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const update = async (reservation) => {
  try {
    const response = await axiosInstance.post("/reservations/update", reservation);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const remove = async (id) => {
  try {
    const response = await axiosInstance.delete("/reservations/"+id);
    return response;
  } catch (error) {
    return error.response.data;
  }
}