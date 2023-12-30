import axiosService from "@/Helpers/axios";


export const getPosts = async () => {
    try {
        const response = await axiosService.get('/posts/getall');
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};

export const getTopPosts = async () => {
    try {
        const response = await axiosService.get('/posts/top/getall');
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};
export const getPopularPosts = async () => {
    try {
        const response = await axiosService.get('/posts/popular/getall');
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};
export const getHousePosts = async () => {
    try {
        const response = await axiosService.get('/posts/house/getall');
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};