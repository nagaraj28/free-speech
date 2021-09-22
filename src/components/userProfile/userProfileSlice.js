import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";

export const loadUserProfile  = createAsyncThunk('userprofile/userid',
async(userid="613f5757976e93d14ff39160")=>{
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
async(userid="613f5757976e93d14ff39160")=>{
    try{
      const {data} =   await axios.get(`http://localhost:5000/user/userposts/${userid}`);
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
    }
})

export default userProfileSlice.reducer;
export const useUserProfileDetails = ()=>useSelector((state)=>state.userProfileDetails);

