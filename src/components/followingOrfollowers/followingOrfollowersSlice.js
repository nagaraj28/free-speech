import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";

export const addFollowing = createAsyncThunk('userprofile/follow',
async(details)=>{
try{
      const {data} =axios.post('http://localhost:5000/userprofile/follow',details);
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
      const {data} =axios.post('http://localhost:5000/userprofile/unfollow',details);
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
            followingToggle:(state)=>{
                state.showFollowingDialog = !(state.showFollowingDialog);
            },
            followersToggle:(state)=>{
                state.showFollowersDialog = !(state.showFollowersDialog);
            }
    }
}
)

export const {followersToggle,followingToggle} = followingfollowersSlice.actions;
export default followingfollowersSlice.reducer;
export const useFollowingFollowers = ()=>useSelector((state)=>state.followingfollowers);
