import React, { useEffect} from "react";
import {Box, Typography} from "@material-ui/core";
import ProfileMiniCard from "../profileminicard/profileminicard";
import styles from "./followingOrFollowers.module.css";
import { loadingUserFollowers, loadingUserFollowing, useUserProfileDetails} from "../userProfile/userProfileSlice";
import { useFollowingFollowers,followingToggle,followersToggle } from "./followingOrfollowersSlice";
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { useDispatch } from "react-redux";


export default function Followers() {    
    const {userDetails,loadingFollowing,loadingFollowers,userFollowing,userFollowers} = useUserProfileDetails();
    const {showFollowingDialog,showFollowersDialog} = useFollowingFollowers();

    const dispatch = useDispatch();
   
  //  console.log(userFollowers,userFollowing);
    return      (<Box  className={styles.followersctnr} onClick={()=>{
        //  dispatch(followersToggle());
      }}>
     {
       (loadingFollowers===false&&showFollowersDialog&&userFollowers.followersData.length>0)?userFollowers.followersData.map((profile)=>{
        return  <ProfileMiniCard profile={profile} page="profile" />
      }):(showFollowersDialog&&loadingFollowers===false&&userFollowers.followersData.length===0)?<Typography className={styles.nofollow} p>{(loadingFollowers===false&&userFollowers.followersData.length===0)?"no followers yet":""}</Typography>:""
      }
      </Box>)    
}
