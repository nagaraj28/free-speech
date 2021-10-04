import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";


export  const updateUserProfile  = createAsyncThunk("userprofile/profileupdate",
    async(profileData)=>{
        try{
         const {data} =  await axios.post("http://localhost:5000/userprofile/profileupdate",profileData);
         return data;
    }catch(err){
        console.log(err);
    }
}
);

const profileEditSlice = createSlice({
    name:"updataprofile",
    initialState:{
        isUpdating:false,
        updateMessage:""
    },
  
    extraReducers:{
        [updateUserProfile.pending]:(state)=>{
            state.isUpdating = true;
            state.updateMessage="updating details";
        },
        [updateUserProfile.rejected]:(state)=>{
            state.isUpdating = false;
            state.updateMessage="update error";

        },
        [updateUserProfile.fulfilled]:(state)=>{
            state.isUpdating = false;
            state.updateMessage="update success";
        },   
    }
})

export default profileEditSlice.reducer;
export const useUpadatedProfileDetails = ()=>useSelector((state)=>state.updatedProfileDetails);

