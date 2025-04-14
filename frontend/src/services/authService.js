import axiosInstance from "../utils/axios";

export const login = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response;
  } catch (error) {
    // 确保错误对象包含必要的信息
    if (error.response?.data) {
      error.response.data.status = error.response.status;
      return error.response.data;
    }
    throw error;
  }
}

export const logout = async () => {
  try {
    const response = await axiosInstance.post("/auth/logout");
    return response.data;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export const changePassword = async (email, password) => {
  try {
    const response = await axiosInstance.post("/auth/change-password", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Change password error:', error);
    throw error;
  }
}