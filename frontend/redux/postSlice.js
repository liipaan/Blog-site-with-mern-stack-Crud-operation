import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//fetch posts from API
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {   
    try {
      const res = await fetch("http://localhost:3000/api/posts");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//get single post
export const getPost = createAsyncThunk(
  "posts/getPost",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`);
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//add post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post, { rejectWithValue }) => {
    try {
      const res = await fetch("http://localhost:3000/api/posts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//edit post
export const editPost = createAsyncThunk(
  "posts/editPost",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to update post");
      }

      const updatedPost = await res.json();
      return updatedPost;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

//delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      // 🔥 ID-ga dib u celi
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    loading: false,
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload.posts;
        state.status = "successfully fetched";
      }).addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      }).addCase(getPost.fulfilled, (state, action) => {
        state.post = action.payload.post;
        state.status = "successfully fetched";
      }).addCase(getPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      }).addCase(addPost.fulfilled, (state, action) => {
        state.posts = [...state.posts, action.payload.post];
        state.status = "successfully added";
      }).addCase(addPost.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPost.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload; 
      })  
  .addCase(editPost.pending, (state) => {
    state.loading = true;
  })
  .addCase(editPost.fulfilled, (state, action) => {
    state.loading = false;
    state.post = action.payload;
  })
  .addCase(editPost.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload;
  }).addCase(deletePost.fulfilled, (state, action) => {
  state.posts = state.posts.filter(
    (post) => post._id !== action.payload
  );
  state.status = "succeeded";
})
.addCase(deletePost.pending, (state) => {
  state.status = "loading";
})
.addCase(deletePost.rejected, (state, action) => {
  state.status = "failed";
  state.error = action.payload;
});


    // ...
  },
});
export default postSlice.reducer;
