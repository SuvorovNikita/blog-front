import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const featchPosts = createAsyncThunk('posts/featchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const featchTags = createAsyncThunk('posts/featchTags', async () => {
  const { data } = await axios.get('/tags');
  return data;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [featchPosts.pending]: (state) => {
      state.posts.items = [];
      state.posts.status = 'loading';
    },
    [featchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [featchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [featchTags.pending]: (state) => {
      state.tags.items = [];
      state.tags.status = 'loading';
    },
    [featchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [featchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
  },
});

export const postsReducer = postsSlice.reducer;
