import axiosService from "@/Helpers/axios";

const getBlog = async (id: string) => {
  const response = await axiosService.get(`/posts/${id}`);

  return response.data;
};

export default getBlog;
