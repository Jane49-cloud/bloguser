import axiosService from "@/Helpers/axios";

export const Login = async (data: any) => {
  const response = await axiosService.post("/users/login", data);
  return response;
};

export const RegisterUser = async (formData: any) => {
  try {
    const response = await axiosService.post("/users/register", formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Corrected syntax
      },
    });

    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const currentUser = async () => {
  try {
    const response = await axiosService.get("/users/current-user");
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};

export const AllUsers = async () => {
  try {
    const response = await axiosService.get("/users/all-users");
    return response.data;
  } catch (error) {
    throw new Error("Registration failed");
  }
};
