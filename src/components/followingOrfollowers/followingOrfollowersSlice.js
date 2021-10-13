import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import { URL } from "../../cofig/config";

export const addFollowing = createAsyncThunk('userprofile/follow',
async(details)=>{
try{
      const {data} =axios.post(`${URL}/userprofile/follow`,details);
      return data;
}
catch(err){
        console.log("Error",err);
}
}   
);
export const unFollow = createAsyncThunk('userprofile/unfollow',
async(details)=>{
try{
      const {data} =axios.post(`${URL}/userprofile/unfollow`,details);
      return data;
}
catch(err){
        console.log("Error",err);
}
}   
);

const  followingfollowersSlice = createSlice({
    name:'followingfollowers',
    initialState:{
        showFollowersDialog:false,
        showFollowingDialog:false,

    },
    reducers:{
            followingToggle:(state,action)=>{
                state.showFollowingDialog = action.payload;
            },
            followersToggle:(state,action)=>{
                state.showFollowersDialog = action.payload;
            }
    }
}
)

export const {followersToggle,followingToggle} = followingfollowersSlice.actions;
export default followingfollowersSlice.reducer;
export const useFollowingFollowers = ()=>useSelector((state)=>state.followingfollowers);
