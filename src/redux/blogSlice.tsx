// blogSlice.js
import {
    createTopPost,
    createPopularPost,
    createHousePost,
    createPost,
} from '@/hooks/post.actions';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

// Thunks
export const createTopPostAsync = createAsyncThunk('blog/createTopPost', async (formData: any) => {
    const response = await createTopPost(formData);
    try {
        if (response.data.success) {
            toast.success(response.data.message);
            return response;
        } else {
            toast.error(response.data.message);
        }
    } catch (error: any) {
        throw new error();
    }
});

export const createPopularPostAsync = createAsyncThunk(
    'blog/createPopularPost',
    async (formData: any) => {
        const response = await createPopularPost(formData);
        try {
            if (response.data.success) {
                toast.success(response.data.message);
                return response;
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            throw new error();
        }
    }
);

export const createHousePostAsync = createAsyncThunk(
    'blog/createHousePost',
    async (formData: any) => {
        const response = await createHousePost(formData);
        try {
            if (response.data.success) {
                toast.success(response.data.message);
                return response;
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            throw new error();
        }
    }
);

export const createPostAsync = createAsyncThunk('blog/createPost', async (formData: any) => {
    const response = await createPost(formData);
    try {
        if (response.data.success) {
            toast.success(response.data.message);
            return response;
        } else {
            toast.error(response.data.message);
        }
    } catch (error: any) {
        throw new error();
    }
});

// Slice
const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        loading: false,
        error: null,
        blogData: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createTopPostAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTopPostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blogData = action.payload;
            })
            .addCase(createTopPostAsync.rejected, (state) => {
                state.loading = false;
            })
            // Repeat the pattern for other actions (createPopularPostAsync, createHousePostAsync, createPostAsync)
            .addCase(createPopularPostAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPopularPostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blogData = action.payload;
            })
            .addCase(createPopularPostAsync.rejected, (state) => {
                state.loading = false;
            })

            .addCase(createHousePostAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createHousePostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blogData = action.payload;
            })
            .addCase(createHousePostAsync.rejected, (state) => {
                state.loading = false;
            })

            .addCase(createPostAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPostAsync.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.blogData = action.payload;
            })
            .addCase(createPostAsync.rejected, (state) => {
                state.loading = false;
            });
        // Repeat for other actions...
    },
});

export default blogSlice.reducer;
