import axiosService from '@/Helpers/axios';

//get posts
export const getPosts = async () => {
    try {
        const response = await axiosService.get('/posts');
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};

//get a product

export const getPost = async (id: string) => {
    try {
        const response = await axiosService.get(`/posts/${id}`);
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};

// delete post
export const deletePost = async (id: string) => {
    try {
        const response = await axiosService.delete(`/posts/${id}`);
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};

//get user posts
export const getUserPosts = async (userId: any) => {
    try {
        const response = await axiosService.get(`/posts/user/${userId}`);
        return response.data;
    } catch (error: any) {
        return error.message;
    }
};
