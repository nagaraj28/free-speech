import React, { useEffect} from "react";
import {Box, Typography} from "@material-ui/core";
import ProfileMiniCard from "../profileminicard/profileminicard";
import styles from "./followingOrFollowers.module.css";
import { loadingUserFollowers, loadingUserFollowing, useUserProfileDetails} from "../userProfile/userProfileSlice";
import { useFollowingFollowers,followingToggle,followersToggle } from "./followingOrfollowersSlice";
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { useDispatch } from "react-redux";


export default function Following() {    
    const {userDetails,loadingFollowing,loadingFollowers,userFollowing,userFollowers} = useUserProfileDetails();
    const {showFollowingDialog,showFollowersDialog} = useFollowingFollowers();

    const dispatch = useDispatch();
   
  //  console.log(userFollowers,userFollowing);
    return      (<Box className={styles.followingctnr} onClick={()=>{
                   // dispatch(followingToggle());
                }}>
               {
                (loadingFollowing===false&&showFollowingDialog&&userFollowing.followingData.length>0)?userFollowing.followingData.map((profile)=>{
                  return  <ProfileMiniCard profile={profile} page="profile" />
                }):(showFollowingDialog&&loadingFollowing===false&&userFollowing.followingData.length===0)?<Typography  className={styles.nofollow} p>{(loadingFollowing===false&&userFollowing.followingData.length===0)&&"not following anyone"}</Typography>:""
                }
                </Box>)    
}
