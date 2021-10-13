import React,{useEffect, useState} from "react";
import styles from "./profileminicard.module.css";
import profileImage from "../../assets/image9.jpg";
import {Container,Avatar,Typography,Button, Box} from "@material-ui/core";
import {Link} from "react-router-dom";
import { loadingUserFollowing, useUserProfileDetails } from "../userProfile/userProfileSlice";
import { useDispatch } from "react-redux";
import { addFollowing,unFollow,followingToggle,followersToggle,useFollowingFollowers } from "../followingOrfollowers/followingOrfollowersSlice";
import {useAuthenticationDetails} from "../authentication/authenticationSlice";
import { likeModalToggleUtil,usePosts } from "../card/cardSlice";
import {notificationModalUtil,useNotificationModal} from "../navbar/notificationSlice";



export default function ProfileMiniCard({profile,page,date}){

    const {userid,username,avatar,fullname} = profile;
    const dispatch = useDispatch();
    const {likeModalToggle} = usePosts();
    const {userDetails} = useUserProfileDetails();
    const {adminUserDetails} = useAuthenticationDetails();
    const {showFollowersDialog,showFollowingDialog} = useFollowingFollowers();
    const {isNotification} = useNotificationModal();
    const [isFollowing,setIsFollowing] = useState((adminUserDetails&&adminUserDetails.following)?adminUserDetails.following.includes(userid):false);
    const colors = ["#DC2626","#4D7C0F","#0E7490","#1E40AF","#BE185D"];
    const colorIndex = Math.floor(Math.random() * 5);
    const details = {
        userid:adminUserDetails.userid,
        followerid:userid
    }
   // console.log(userDetails.following);
   console.log(page);
    return (
            <Box className={styles.minictnr}>
          <Container className={styles.searchprofile} > 
          <Link style={{textDecoration:"none",color:"#1C1917"}} to={`/profile/${username}`}  >
                {
                (avatar&&avatar.length>0)?
                <Avatar  className={(page==="homefeedprofile")?styles.homefeedprofileavatar:styles.searchprofileavatar}  alt="search profile image" src={profileImage}/>:
                <Avatar className={(page==="homefeedprofile")?styles.homefeedprofileavatar:styles.searchprofileavatar}   style={{backgroundColor:colors[colorIndex]}} >{fullname&&fullname[0]}</Avatar>
            }
            </Link>
                      <Link style={{textDecoration:"none",color:"#1C1917"}} to={`/profile/${username}`} onClick={()=>{
                          if(showFollowersDialog)
                          dispatch(followersToggle(false));
                           if(showFollowingDialog)
                          dispatch(followingToggle(false));
                           if(likeModalToggle)
                          dispatch(likeModalToggleUtil(false));
                           if(isNotification)
                          dispatch(notificationModalUtil(false));

                      }} >
                <Typography component="div">
                <Typography component="h1">{username} <span className={styles.notifyminitext}>{page==="notification"&& `started following you ${date.day} ${date.month} ${date.year}`} </span></Typography>
                {page!=="notification"&&<Typography component="h2">{fullname}</Typography>}
                </Typography>
                </Link>

            </Container>
                {(page!=="home"&&userid!==adminUserDetails.userid)&&<Box>
                {isFollowing?<Button className={styles.userutilbtn} onClick={()=>{
                setIsFollowing(false)
                dispatch(unFollow(details))
            }}>following</Button>:
                <Button className={styles.userutilbtn} onClick={()=>{
                    setIsFollowing(true)
                        dispatch(addFollowing(details))
                }} >follow</Button>
        }
                </Box>
}
              </Box>
      
    )
}