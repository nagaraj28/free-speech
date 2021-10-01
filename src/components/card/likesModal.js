import React, { useEffect} from "react";
import {Box, Typography} from "@material-ui/core";
import ProfileMiniCard from "../profileminicard/profileminicard";
import styles from "../followingOrfollowers/followingOrFollowers.module.css";
import { loadingUserFollowers, loadingUserFollowing, useUserProfileDetails} from "../userProfile/userProfileSlice";
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import { useDispatch } from "react-redux";
import {likeModalToggleUtil} from "./cardSlice";
import { usePosts } from "./cardSlice";

export default function LikesModal() {    
    //const {userDetails,loadingFollowing,loadingFollowers,userFollowing,userFollowers} = useUserProfileDetails();
    const dispatch = useDispatch();
    const {likeModalToggle,postlikes,loadinglikesDetails,loadinglikesDetailsError} = usePosts();
    return  <>{(likeModalToggle)&&<Box className={styles.followingfollowersctnr}>
                {likeModalToggle&&(<Box  className={styles.headerctnr}><Typography>Likes</Typography><ClearSharpIcon onClick={()=>{
                    dispatch(likeModalToggleUtil(false));
                }}
                /></Box>)}
                {<Box className={styles.followingctnr} onClick={()=>{
                   // dispatch(followingToggle());
                }}>
               {
                (likeModalToggle&&loadinglikesDetails===false&&postlikes.length>0)?postlikes.map((profile)=>{
                  return  <ProfileMiniCard profile={profile} page="profile" />
                }):(likeModalToggle&&loadinglikesDetails===false&&postlikes.length===0)?<Typography  className={styles.nofollow} p>{(loadinglikesDetails===false)&&"no likes"}</Typography>:""
                }
                </Box>
}
                         </Box>
}
    </>
}
