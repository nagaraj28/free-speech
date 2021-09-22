import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";

export const fetchPosts = createAsyncThunk('user/posts',
async (userid)=>{
    try{
        const {data} = await axios.get(`http://localhost:5000/user/posts/${userid}`);    
        return data;
    }   
    catch(error){
        return error?.response;
    }
}
);

/* upload new post */
export const uploadPost = createAsyncThunk('user/addpost',
 async (newPost)=>{
    try{
        const {data} = 
        await axios.post("http://localhost:5000/user/addpost",newPost);
        return data;
    }
    catch(error){
        console.log("error uploading post",error?.response);
        return error?.response
    }
 }
);


 const cardSlice = createSlice({
    name:'posts',
    initialState:{
        posts:[],
        loading:true,
    },
    extraReducers:{
    [fetchPosts.pending]:(state)=>{
        state.loading=true;
    },
    [fetchPosts.fulfilled]:(state,action)=>{
        state.loading = false;
        state.posts=action.payload;
    },
    [fetchPosts.rejected]:(state,action)=>{
        state.loading = false;
        state.error=action.payload;
    },
    [fetchPosts.fulfilled]:(state,action)=>{
        state.loading = false;
        state.posts=action.payload;
    },
    [uploadPost.fulfilled]:(state,action)=>{
        console.log(action.payload);
        state.loading = false;
        state.posts=[action.payload,...state.posts];
    },
    [uploadPost.rejected]:(state,action)=>{
      console.log("error uploading new post");
    },
    }
});

export default  cardSlice.reducer;
export const usePosts =()=>useSelector((state)=>state.posts);