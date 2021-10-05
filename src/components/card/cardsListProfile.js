import React, { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import styles from "./card.module.css";
import { Box } from "@material-ui/core";
import Image from "../../assets/image9.jpg";
import {loadUserProfile,loadUserPosts,useUserProfileDetails} from "../userProfile/userProfileSlice";
import CardData from "./cardPost";
import {useParams} from "react-router-dom";
import { loadingusersprofile } from "./cardSlice";
import { loaduserDetails } from "../authentication/authenticationSlice";
import { useAuthenticationDetails } from "../authentication/authenticationSlice";

 

export default function PostCard(){
    const dispatch = useDispatch();
    const {username} = useParams();
    const {loadingProfile,userDetails,loadingPosts,userPosts} = useUserProfileDetails(); 
    const {loggeduserid}=useAuthenticationDetails();
   useEffect(()=>{
        console.log("from post component " ,username)
      //  dispatch(loadingusersprofile());
     //   dispatch(loadUserProfile(username))
    //    dispatch(loaduserDetails(username));
        if(userDetails&&userDetails.username)
        dispatch(loadUserPosts(userDetails.userid)); 
      //  dispatch(loaduserDetails(loggeduserid))
   },[/*username*/userDetails])
    

   // if(userDetails&&userDetails.username)
  //  );
      
  return <Box className={styles.postsctnrprofile} style={{overflowY:"unset"}}> 
       {userDetails&&userPosts&&userPosts.length>0&&userPosts.map(post=>{
        //  const [{avatar,username}] = usersProfile.filter(user =>(user.userid===post.userid));
             return <CardData post={post} place={"profilepage"} avatar={userDetails.avatar} username={userDetails.username} />
       })
}
  </Box>


}

