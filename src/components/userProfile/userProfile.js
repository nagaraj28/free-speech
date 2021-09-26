import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {Card,Box,Avatar,Typography,Button,Container} from '@material-ui/core';
import profileImage from "../../assets/image9.jpg";
import {useUserProfileDetails,loadUserProfile,loadUserPosts} from "./userProfileSlice";
import { ExitToApp } from "@material-ui/icons";
import styles from "./userProfile.module.css";
import {useParams} from "react-router";
import { followingToggle,followersToggle } from "../followingOrfollowers/followingOrfollowersSlice";
 

export default function UserProfile(){
    const dispatch = useDispatch();
    const {username} = useParams();
    console.log(username);
    useEffect(()=>{
        dispatch(loadUserProfile(username));
        dispatch(loadUserPosts());

    },[username]);
    const {
        loadingProfile,userDetails,loadingPosts,userPosts
    } = useUserProfileDetails(); 
    console.log(loadingProfile,userDetails,loadingPosts,userPosts)
          const {userid,fullname,bio,link,avatar,followers,following} = userDetails;

    return (<Box className={styles.userprofileparent}>
                 <Box>
                 <Avatar  className={styles.userprofileavatar} alt="user profile image" src={profileImage}/>
                </Box>
                <Box>
                    <Container  className={styles.userprofilechildone}>
                    <Typography   p>{userDetails.username}</Typography >
                    <Button className={styles.editprofilebtn}> edit profile </Button>
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