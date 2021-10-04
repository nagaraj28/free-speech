import { configureStore } from '@reduxjs/toolkit';
import postReducer from "../components/card/cardSlice";
import uploadModalReducer from "../components/uploadmodal/uploadModalSlice";
import userProfileReducer from "../components/userProfile/userProfileSlice";
import followingFollowerReducer from "../components/followingOrfollowers/followingOrfollowersSlice";
import authenticationDetailsReducer from "../components/authentication/authenticationSlice";
import notificationReducer from "../components/navbar/notificationSlice";
import updatedProfileDetailsReducer from "../components/profileedit/profileEditSlice";


export default configureStore({
    reducer:{
        posts:postReducer,
        uploadModal:uploadModalReducer,
        userProfileDetails:userProfileReducer,
        followingfollowers:followingFollowerReducer,
        authenticationDetails:authenticationDetailsReducer,
        notificationModal:notificationReducer,
        updatedProfileDetails:updatedProfileDetailsReducer,
        
    }
});

