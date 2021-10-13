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
import NotificationContainer from "./notificationContainer";
import {notificationModalUtil,useNotificationModal} from "./notificationSlice";
import {TextField} from "@material-ui/core";


export default function NavBar(){
 
  const dispatch = useDispatch();
  const [searchedProfiles,setSearchedProfiles] = useState([]);
  const {usersProfile} = usePosts();
  const {loggeduserid,adminUserDetails} = useAuthenticationDetails();
  const  {isNotification} = useNotificationModal();

  /*useEffect(()=>{
    dispatch(loaduserDetails(loggeduserid));
  },[loggeduserid])
  console.log(usersProfile);*/
 
   // console.log(searchedProfiles);
  return <Box><Box className={styles.navctnr}>
      <Typography component="div">
          <Link style={{textDecoration:"none"}} to="/"><span className={styles.brandlogo}>FreeSpeech</span></Link>
      </Typography>
      <Box component="div"> 
         <input className={styles.searchbox} type="search" placeholder="type to search..." onChange={(e)=>{
           setSearchedProfiles(findUsers(usersProfile,e.target.value));
         }} />  
         <SearchContainer searchedprofiles={searchedProfiles} />
      </Box>
      <Typography component="div">
          <AddBoxSharpIcon className={styles.desktopnav} onClick={()=>dispatch(uploadModalToggle())}/>
          <Link className={styles.desktopnav} to="/">
          <HomeSharpIcon style={{color:"#000"}}/>
          </Link>
          <NotificationsSharpIcon  onClick={()=>{
                                dispatch(notificationModalUtil(!isNotification));
          }}
          />
          <NotificationContainer/>
          <Link to={`/profile/${adminUserDetails.username}`}>
          <AccountCircleSharpIcon  className={styles.desktopnav} style={{color:"#000"}}/>
          </Link>
     </Typography>
  </Box>
  <Box className={styles.mobilenavctnr}>
  <Typography className={styles.mobilenav} component="div">
  <Link   to="/">
          <HomeSharpIcon style={{color:"#000"}}/>
          </Link>
          <AddBoxSharpIcon  onClick={()=>dispatch(uploadModalToggle())}/>
          <Link to={`/profile/${adminUserDetails.username}`} >
          <AccountCircleSharpIcon style={{color:"#000"}}/>
          </Link>
     </Typography>
  </Box>
  </Box>


}

