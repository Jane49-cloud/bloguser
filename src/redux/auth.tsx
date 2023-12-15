import { Login, RegisterUser, currentUser } from '@/hooks/user.actions';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

interface AuthState {
    token: string | null;
    user: any; // Replace 'any' with the actual type of your user object
    isLoading: boolean;
}

const initialState: AuthState = {
    token: null,
    user: null,
    isLoading: false,
};

export const loginAction = createAsyncThunk(
    'login',

    async (data: any) => {
        try {
            const response = await Login(data);
            if (response.data.success) {
                toast.success(response.data.message);
                return response.data;
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            // Use rejectWithValue to handle errors
            return toast.error('An error occurred during login');
        }
    }
);

export const getLoggedInUser = createAsyncThunk('auth/getLoggedInUser', async () => {
    const userToken = localStorage.getItem('auth');
    // console.log(userToken);

    if (userToken) {
        try {
            const response = await currentUser();
            console.log(response.data);
            const userData = response.data;
            return userData;
        } catch (error) {
            throw error;
        }
    }

    return null;
});

export const RegisteringUser = createAsyncThunk(
    'auth/registeringUser',
    async ({ formData, navigate }: { formData: any; navigate: any }) => {
        try {
            const response = await RegisterUser(formData);

            if (response.data.success) {
                toast.success(response.data.message);
                setTimeout(() => {
                    navigate('/login');
                }, 1000);
            } else {
                toast.error(response.data.message);
            }
        } catch (error: any) {
            console.error('Error in Registering User:', error.response.data.message);
            toast.error(error.response.data.message);
            return Promise.reject(error);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginAction.fulfilled, (state, action) => {
            // Handle the fulfilled login action as needed
            state.token = action.payload.token;
            state.user = action.payload.user;
            localStorage.setItem('auth', action.payload.token);
            state.isLoading = false;
        });
        builder.addCase(loginAction.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(loginAction.rejected, (state, action) => {
            // Handle the rejected login action as needed
            state.isLoading = false;
            // Access the error message using action.error.message
            const errorMessage = action.error.message || 'An error occurred during login';
            toast.error(errorMessage);
        });

        builder
            .addCase(getLoggedInUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getLoggedInUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(getLoggedInUser.rejected, (state) => {
                state.isLoading = false;
            });

        builder
            .addCase(RegisteringUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(RegisteringUser.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(RegisteringUser.rejected, (state) => {
                state.isLoading = false;
            });
    },
});

export const { setUser, logout } = authSlice.actions;
export const selectAuth = (state: any) => state.auth;
export default authSlice.reducer;
