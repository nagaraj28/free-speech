import React, { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import {Card,Box,Avatar,Typography,Button,Container} from '@material-ui/core';
import profileImage from "../../assets/image9.jpg";
import {useUserProfileDetails,loadUserProfile,loadUserPosts,loadingUserFollowers} from "./userProfileSlice";
import { ExitToApp } from "@material-ui/icons";
import styles from "./userProfile.module.css";
import {useParams} from "react-router";
import { followingToggle,followersToggle, addFollowing, unFollow} from "../followingOrfollowers/followingOrfollowersSlice";
import {useAuthenticationDetails} from "../authentication/authenticationSlice";
import {loaduserDetails} from "../authentication/authenticationSlice"

export default function UserProfile(){

    const dispatch = useDispatch();
    const {username} = useParams();
    const {adminUserDetails,loggeduserid} = useAuthenticationDetails();
    const [isFollowing,setIsFollowing] = useState(false);
    useEffect(()=>{
        if(!adminUserDetails)
        dispatch(loaduserDetails(loggeduserid))
     /*   if(toggle===true){
            dispatch(loaduserDetails(loggeduserid))
            setIsFollowing(false);
        }*/
       // else{
            dispatch(loadUserProfile(username));
    //    }
       // dispatch(loaduserDetails(loggeduserid))
     //   dispatch(loadUserPosts());     
    },[username]);
    const {
        loadingProfile,userDetails,loadingPosts,userPosts
    } = useUserProfileDetails(); 
//   console.log(loadingProfile,userDetails,loadingPosts,userPosts)
          const {userid,fullname,bio,link,avatar,followers,following} = userDetails;
            const details = {
                userid:adminUserDetails.userid,
                followerid:userid
            }
            console.log("error happening",adminUserDetails,userid)
            console.log(adminUserDetails.following.includes(userid));
       
           // const [isFollowing,setIsFollowing] = useState((adminUserDetails&&adminUserDetails.following&&userDetails&&userid&&adminUserDetails.following.includes(userid))?true:false);
            return (adminUserDetails&&adminUserDetails.following&&userDetails&&<Box className={styles.userprofileparent}>
            <Box>
                 <Avatar  className={styles.userprofileavatar} alt="user profile image" src={profileImage}/>
                </Box>
                <Box>
                    <Container  className={styles.userprofilechildone}>
                    <Typography   p>{userDetails.username}</Typography >
                    {
                    (adminUserDetails.userid===userid)?<Button className={styles.editprofilebtn}>edit profile</Button>:adminUserDetails.following.includes(userid)?
                    <Button className={styles.editprofilebtn} onClick={()=>{
                        dispatch(unFollow(details))
                       // setIsFollowing(true);
                       setTimeout(()=>{
                        dispatch(loaduserDetails(loggeduserid))
                        dispatch(loadUserProfile(username));
                    },1000);
                    }}>Following</Button>:<Button className={styles.editprofilebtn} onClick={()=>{
                      //  setIsFollowing(true);
                        dispatch(addFollowing(details));
                        setTimeout(()=>{
                            dispatch(loaduserDetails(loggeduserid))
                            dispatch(loadUserProfile(username));
                        },1000);

                    }}>Follow</Button>
                    }
                    <ExitToApp/>
                    </Container>
                    <Container  className={styles.userprofilechildtwo}>
                    <Typography  p> {userPosts&&userPosts.length} posts </Typography >
                    <Typography   onClick={()=>{
                            dispatch(followersToggle())
                    }} p> {followers&&followers.length} followers </Typography >
                    <Typography onClick={()=>{
                            dispatch(followingToggle())
                    }}  p> {following&&following.length} following </Typography>
                    </Container>
                    <Container  className={styles.userprofilechildtwo}>
                    <Typography  p>bio:-)  {bio&&bio}</Typography>
                    </Container>
                    <Container  className={styles.userprofilechildtwo}>
                    <Typography  p>link:-) {link&&link}</Typography>
                    </Container>
                </Box>
    </Box>
    )
 }