import { getPosts } from '@/hooks/post.actions';
import { getTopPosts, getPopularPosts, getHousePosts } from '@/hooks/posts.actions';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


interface ProductsState {
    Posts: [];
    TopPosts: [];
    PopularPosts: [];
    isLoading: boolean;
    HousePosts: [];
    searchStatus: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: ProductsState = {
    Posts: [],
    TopPosts: [],
    PopularPosts: [],
    isLoading: false,
    HousePosts: [],

    searchStatus: 'idle',
};

export const fetchPosts = createAsyncThunk('allposts', async () => {
    try {
        const response = await getPosts();
        console.log(response);
        return response.posts;
    } catch (error) {}
});

export const fetchTopPosts = createAsyncThunk('alltopposts', async () => {
    try {
        const response = await getTopPosts();
        console.log(response);
        return response.posts;
    } catch (error) {}
});

export const fetchPopularPosts = createAsyncThunk('allpopularposts', async () => {
    try {
        const response = await getPopularPosts();
        console.log(response);
        return response.posts;
    } catch (error) {}
});

export const fetchHousePosts = createAsyncThunk('allhouseposts', async () => {
    try {
        const response = await getHousePosts();
        return response.posts;
    } catch (error) {}
});

const blogsSlice = createSlice({
    name: 'Blogs',
    initialState,
    reducers: {
        // Any synchronous reducers can be added here if needed
    },
    extraReducers: (builder) => {
        builder
            // For fetchPosts
            .addCase(fetchPosts.pending, (state) => {
                state.isLoading = true;
                state.searchStatus = 'pending';
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.Posts = action.payload;
                state.searchStatus = 'fulfilled';
            })
            .addCase(fetchPosts.rejected, (state) => {
                state.isLoading = false;
                state.searchStatus = 'rejected';
            })

            // For fetchTopPosts
            .addCase(fetchTopPosts.pending, (state) => {
                state.isLoading = true;
                state.searchStatus = 'pending';
            })
            .addCase(fetchTopPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.TopPosts = action.payload;
                state.searchStatus = 'fulfilled';
            })
            .addCase(fetchTopPosts.rejected, (state) => {
                state.isLoading = false;
                state.searchStatus = 'rejected';
            })

            // For fetchPopularPosts
            .addCase(fetchPopularPosts.pending, (state) => {
                state.isLoading = true;
                state.searchStatus = 'pending';
            })
            .addCase(fetchPopularPosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.PopularPosts = action.payload;
                state.searchStatus = 'fulfilled';
            })
            .addCase(fetchPopularPosts.rejected, (state) => {
                state.isLoading = false;
                state.searchStatus = 'rejected';
            })

            // For fetchHousePosts
            .addCase(fetchHousePosts.pending, (state) => {
                state.isLoading = true;
                state.searchStatus = 'pending';
            })
            .addCase(fetchHousePosts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.HousePosts = action.payload;
                state.searchStatus = 'fulfilled';
            })
            .addCase(fetchHousePosts.rejected, (state) => {
                state.isLoading = false;
                state.searchStatus = 'rejected';
            });
    },
});

export const {
    /* any additional synchronous actions go here */
} = blogsSlice.actions;
export default blogsSlice.reducer;