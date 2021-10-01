import React,{ useEffect, useState } from "react";
import {useHistory,Link} from "react-router-dom";
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import styles from "./navbar.module.css";
import {useDispatch} from "react-redux";
import { uploadModalToggle } from "../uploadmodal/uploadModalSlice";
import {findUsers} from "./utils/searchUsers";
import {usePosts} from "../card/cardSlice"
import SearchContainer from "./searchContainer";
import ProfileMiniCard from "../profileminicard/profileminicard";
import  {useUserProfileDetails} from "../userProfile/userProfileSlice"
import  {loaduserDetails} from "../authentication/authenticationSlice";
import {useAuthenticationDetails} from "../authentication/authenticationSlice";
export default function NavBar(){
 
  const dispatch = useDispatch();
  const [searchedProfiles,setSearchedProfiles] = useState([]);
  const {usersProfile} = usePosts();
  const {loggeduserid,adminUserDetails} = useAuthenticationDetails();
  useEffect(()=>{
    dispatch(loaduserDetails(loggeduserid));
  },[loggeduserid])
  console.log(usersProfile);
 
   // console.log(searchedProfiles);
  return <Box className={styles.navctnr}>
      <Typography component="div">
           
          <Link to="/">FreeSpeech</Link>
      </Typography>
      <Box component="div"> 
         <input type="search" placeholder="search-box" onChange={(e)=>{
           setSearchedProfiles(findUsers(usersProfile,e.target.value));
         }} />  
         <SearchContainer searchedprofiles={searchedProfiles} />
      </Box>
      <Typography component="div">
          <AddBoxSharpIcon  onClick={()=>dispatch(uploadModalToggle())}/>
          <HomeSharpIcon/>
          <NotificationsSharpIcon/>
          <Link to={`/profile/${adminUserDetails.username}`}>
          <AccountCircleSharpIcon />
          </Link>
     </Typography>
  </Box>


}

