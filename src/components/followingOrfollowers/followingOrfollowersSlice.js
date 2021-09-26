import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

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
