import React, { useEffect } from "react";
import {useDispatch} from "react-redux";
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
import { Box,Container } from "@material-ui/core";
import Image from "../../assets/image9.jpg";
import {fetchPosts,usePosts,loadingusersprofile} from "./cardSlice";
import CardData from "./cardPost";
import { useAuthenticationDetails } from "../authentication/authenticationSlice";
import { loaduserDetails } from "../authentication/authenticationSlice";


export default function PostCard(){
       const dispatch = useDispatch();
      const {loggeduserid} = useAuthenticationDetails();
      console.log(loggeduserid);
    useEffect(()=>{
        dispatch(fetchPosts(loggeduserid));
        dispatch(loadingusersprofile());
        dispatch(loaduserDetails(loggeduserid));
    },[])
    const {loading,posts,usersProfile} =usePosts();
    console.log(loading,posts);
 //   let likes =[];
   //  likes = posts&&posts.likes;

  return <Box className={styles.postsctnr}> 
       {posts&&usersProfile.length>0&&posts.map(post=>{
          const [{avatar,username}] = usersProfile.filter(user =>(user.userid===post.userid));
             return <CardData post={post} place={"home"} avatar={avatar} username={username} />
       })
}

  </Box>


}

