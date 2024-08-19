import{ createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPosts = createAsyncThunk('post/fetchPosts', async () => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (newPost) => {
    const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
    return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async (updatedPost) => {
    const response = await axios.put(`https://jsonplaceholder.typicode.com/posts/${updatedPost.id}`,updatedPost);
    return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    return id;
});

const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(createPost.fulfilled, (state, action) => {
            state.posts.push(action.payload);
        }) 
        .addCase(updatePost.fulfilled, (state, action) => {
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            state.posts[index] = action.payload;
        })
        .addCase(deletePost.fulfilled, (state, action) => {
            state.posts = state.posts.filter(post => post.id !== action.payload);
        });
   },
    
});

export default postsSlice.reducer;