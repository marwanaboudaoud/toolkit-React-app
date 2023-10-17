  import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
  import axios from 'axios';

  export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (params) => {
    try {
      const response = await axios.get(
        'https://frontend-case-api.sbdev.nl/api/posts',
        {params: { ...params, perPage: 8 },
        headers: {token: 'pj11daaQRz7zUIH56B9Z'}
        }
      );
      return response.data;
    } catch (error) {
      console.error('API error:', error.message);
      throw error;
    }
  });

  export const createPost = createAsyncThunk('posts/createPost', async (postData, { dispatch }) => {
    try {
      const formData = new FormData();
      formData.append('title', postData.title);
      formData.append('content', postData.content);
      formData.append('category_id', postData.category_id);
      formData.append('image', postData.image);

      const response = await axios.post(
        'https://frontend-case-api.sbdev.nl/api/posts',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            token: 'pj11daaQRz7zUIH56B9Z',
          },
        }
      );
      dispatch(fetchPosts());
      return response.data;
    } catch (error) {
      console.error('API error:', error.message);
      throw error;
    }
  });

  export const fetchCategories = createAsyncThunk('posts/fetchCategories', async () => {
    try {
      const response = await axios.get(
        'https://frontend-case-api.sbdev.nl/api/categories',
        { headers: { token: 'pj11daaQRz7zUIH56B9Z' } }
      );
      return response.data;
    } catch (error) {
      console.error('API error:', error.message);
      throw error;
    }
  });

  const postsSlice = createSlice({
    name: 'posts',
    initialState: { data: [], categories: [], status: 'idle', error: null, totalPages: 1 },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchPosts.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchPosts.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
          state.totalPages = action.payload.last_page; 
        })
        .addCase(fetchPosts.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
          state.categories = action.payload;
        })
        .addCase(createPost.fulfilled, (state, action) => {
          const newPost = action.payload.data || action.payload;
          state.data = Array.isArray(state.data) ? [...state.data, newPost] : [newPost];
        });
    },
  });

  export default postsSlice.reducer;

