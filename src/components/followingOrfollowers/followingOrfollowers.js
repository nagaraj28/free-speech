import React, { useEffect} from "react";
import {Box, Typography} from "@material-ui/core";
import ProfileMiniCard from "../profileminicard/profileminicard";
import styles from "./followingOrFollowers.module.css";
import { loadingUserFollowers, loadingUserFollowing, useUserProfileDetails} from "../userProfile/userProfileSlice";
import { useFollowingFollowers,followingToggle,followersToggle } from "./followingOrfollowersSlice";
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { useDispatch } from "react-redux";
import Following from "./following";
import Followers from "./followers";



export default function FollowingOrFollowers() {    
    const {showFollowingDialog,showFollowersDialog} = useFollowingFollowers();
    const {userDetails,loadingFollowing,loadingFollowers,userFollowing,userFollowers} = useUserProfileDetails();
    const dispatch = useDispatch();
    useEffect(()=>{
      console.log(userDetails);
        if(showFollowingDialog)
        dispatch(loadingUserFollowing(userDetails.userid));
        else if(showFollowersDialog)
        dispatch(loadingUserFollowers(userDetails.userid));
    },[showFollowersDialog===true||showFollowingDialog===true]);
    console.log(userFollowers,userFollowing);
    return  <>{(showFollowersDialog||showFollowingDialog)&&<Box className={styles.followingfollowersctnr}>
                {showFollowingDialog&&(<Box  className={styles.headerctnr}><Typography>following</Typography><ClearSharpIcon onClick={()=>{
                    dispatch(followingToggle(false));
                }}
                /></Box>)   } 
                {                 <Following/>  }
                    {showFollowersDialog&&(<Box className={styles.headerctnr}><Typography >followers</Typography><ClearSharpIcon onClick={()=>{
                    dispatch(followersToggle(false));
                }}
/></Box>)}
               {<Followers/>}
             </Box>
}
    </>
}
