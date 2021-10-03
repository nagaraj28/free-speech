import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const loadUserProfile  = createAsyncThunk('userprofile/username',
async(username)=>{
    try{
      const {data} =   await axios.get(`http://localhost:5000/userprofile/${username}`);
      return data;
    }
    catch(error){
        console.log("error raised in loaduserprofile");
        return error?.response;
    }
});

export const loadProfileofPost  = createAsyncThunk('userprofile/userid',
async(userid)=>{
    try{
      const {data} =   await axios.get(`http://localhost:5000/userprofile/${userid}`);
      return data;
    }
    catch(error){
        console.log("error raised in loaduserprofile");
        return error?.response;
    }
});

export const loadUserPosts  = createAsyncThunk('user/userposts/userid',
async(userid)=>{
    try{
      const {data} =   await axios.get(`http://localhost:5000/user/userposts/${userid}`);
      return data;
    }
    catch(error){
        console.log("error raised in load userprofile");
        return error?.response;
    }
});

export const loadingUserFollowing  = createAsyncThunk('userprofile/following/userid',
async(userid)=>{
    try{
      const {data} =   await axios.get(`http://localhost:5000/userprofile/following/${userid}`);
      return data;
    }
    catch(error){
        console.log("error raised in load userprofile");
        return error?.response;
    }
});

export const loadingUserFollowers  = createAsyncThunk('userprofile/followers/userid',
async(userid)=>{
    try{
        console.log(`http://localhost:5000/userprofile/followers/${userid}`);
              const {data} =   await axios.get(`http://localhost:5000/userprofile/followers/${userid}`);
      return data;
    }
    catch(error){
        console.log("error raised in load userprofile");
        return error?.response;
    }
});
 
const userProfileSlice = createSlice({
    name:"userprofile",
    initialState:{
        loadingProfile:true,
        userDetails:{},
        loadingPosts:true,
        userPosts:[],
        userFollowing:{},
        userFollowers:{},
        loadingFollowing:true,
        loadingFollowers:true
    },
  
    extraReducers:{
        [loadUserProfile.pending]:(state)=>{
            state.loadingProfile = true;
        },
        [loadUserProfile.fulfilled]:(state,action)=>{   
            state.loadingProfile = false;
            state.userDetails = action.payload;
        },
        [loadUserProfile.rejected]:(state,action)=>{
            state.loadingProfile = false;
            state.error = action.payload;
        },
        [loadUserPosts.pending]:(state)=>{
            state.loadingPosts = true;
        },
        [loadUserPosts.fulfilled]:(state,action)=>{
            state.loadingPosts = false;
            state.userPosts = action.payload;
        },
        [loadUserPosts.rejected]:(state,action)=>{
            state.loadingPosts = false;
            state.error = action.payload;
        },
        [loadingUserFollowing.pending]:(state)=>{
            state.loadingFollowing = true;
        },
        [loadingUserFollowing.fulfilled]:(state,action)=>{
            state.loadingFollowing = false;
            state.userFollowing = action.payload;
        },
        [loadingUserFollowing.rejected]:(state,action)=>{
            state.loadingFollowing = false;
            state.error = action.payload;
        },
        [loadingUserFollowers.pending]:(state)=>{
            state.loadingFollowers = true;
        },
        [loadingUserFollowers.fulfilled]:(state,action)=>{
            state.loadingFollowers = false;
            state.userFollowers = action.payload;
        },
        [loadingUserFollowers.rejected]:(state,action)=>{
            state.loadingFollowers = false;
            state.error = action.payload;
        },
    }
})

export default userProfileSlice.reducer;
export const useUserProfileDetails = ()=>useSelector((state)=>state.userProfileDetails);

