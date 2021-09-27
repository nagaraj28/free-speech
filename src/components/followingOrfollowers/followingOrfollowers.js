import React, { useEffect} from "react";
import {Box, Typography} from "@material-ui/core";
import ProfileMiniCard from "../profileminicard/profileminicard";
import styles from "./followingOrFollowers.module.css";
import { loadingUserFollowers, loadingUserFollowing, useUserProfileDetails} from "../userProfile/userProfileSlice";
import { useFollowingFollowers,followingToggle,followersToggle } from "./followingOrfollowersSlice";
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { useDispatch } from "react-redux";


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
    },[showFollowersDialog,showFollowingDialog]);
    console.log(userFollowers,userFollowing);
    return  <>{(showFollowersDialog||showFollowingDialog)&&<Box className={styles.followingfollowersctnr}>
                {showFollowingDialog&&(<Box  className={styles.headerctnr}><Typography>following</Typography><ClearSharpIcon onClick={()=>{
                    dispatch(followingToggle());
                }}
                /></Box>)}
                {<Box className={styles.followingctnr} onClick={()=>{
                   // dispatch(followingToggle());
                }}>
               {
                (showFollowingDialog&&userFollowing.length>0&&loadingFollowing===false)?userFollowing.map((profile)=>{
                  return  <ProfileMiniCard profile={profile} page="profile" />
                }):(showFollowingDialog&&loadingFollowing===false&&userFollowing.length===0)?<Typography  className={styles.nofollow} p>{(loadingFollowing===false)&&"not following anyone"}</Typography>:""
                }
                </Box>
}
                    {showFollowersDialog&&(<Box className={styles.headerctnr}><Typography >followers</Typography><ClearSharpIcon onClick={()=>{
                    dispatch(followersToggle());
                }}
/></Box>)}
               { <Box  className={styles.followersctnr} onClick={()=>{
                  //  dispatch(followersToggle());
                }}>
               {
                 (loadingFollowers===false&&showFollowersDialog&&userFollowers.length>0)?userFollowers.map((profile)=>{
                  return  <ProfileMiniCard profile={profile} page="profile" />
                }):(showFollowersDialog&&loadingFollowers===false&&userFollowers.length===0)?<Typography className={styles.nofollow} p>{(loadingFollowers===false&&userFollowers.length===0)?"no followers yet":""}</Typography>:""
                }
                </Box>
}
             </Box>
}
    </>
}
