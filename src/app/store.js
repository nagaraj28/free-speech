import { configureStore } from '@reduxjs/toolkit';
import postReducer from "../components/card/cardSlice";
import uploadModalReducer from "../components/uploadmodal/uploadModalSlice";
import userProfileReducer from "../components/userProfile/userProfileSlice";
import followingFollowerReducer from "../components/followingOrfollowers/followingOrfollowersSlice";
import authenticationDetailsReducer from "../components/authentication/authenticationSlice";
import NotificationReducer from "../components/navbar/notificationSlice";

export default configureStore({
    reducer:{
        posts:postReducer,
        uploadModal:uploadModalReducer,
        userProfileDetails:userProfileReducer,
        followingfollowers:followingFollowerReducer,
        authenticationDetails:authenticationDetailsReducer,
        notificationModal:NotificationReducer,
        
    }
});

