import React,{} from "react";
import {useHistory} from "react-router-dom";
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import classes from "./navbar.css";
import {useDispatch} from "react-redux";
import { uploadModalToggle } from "../uploadmodal/uploadModalSlice";



export default function NavBar(){
  const dispatch = useDispatch();
  const history = useHistory();
  return <Box className="nav-ctnr">
      <Typography component="div">
          FreeSpeech
      </Typography>
      <Typography component="div"> 
         <input type="search" placeholder="search-box" />
      </Typography>
      <Typography component="div">
          <AddBoxSharpIcon  onClick={()=>dispatch(uploadModalToggle())}/>
          <HomeSharpIcon/>
          <NotificationsSharpIcon/>
          <AccountCircleSharpIcon onClick={()=>{history.push("/profile")}}/>
     </Typography>
  </Box>


}

