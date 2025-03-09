
import axiosInstance from "../utils/axios";

export const create = async (meetingroom) => {
  try {
    const response = await axiosInstance.post("/meetingrooms/create", meetingroom);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const update = async (meetingroom) => {
  try {
    const response = await axiosInstance.post("/meetingrooms/update", meetingroom);
    return response;
  } catch (error) {
    return error.response.data;
  }
}

export const remove = async (id) => {
  try {
    const response = await axiosInstance.delete("/meetingrooms/"+id);
    return response;
  } catch (error) {
    return error.response.data;
  }
}