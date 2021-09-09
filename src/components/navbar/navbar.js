import React from "react";
import AddBoxSharpIcon from '@material-ui/icons/AddBoxSharp';
import HomeSharpIcon from '@material-ui/icons/HomeSharp';
import NotificationsSharpIcon from '@material-ui/icons/NotificationsSharp';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

import Typography from '@material-ui/core/Typography';

import classes from "./navbar.css";


export default function NavBar(){

  return <Box className="nav-ctnr">
      <Typography component="div">
          FreeSpeech
      </Typography>
      <Typography component="div"> 
         <input type="search" placeholder="search-box" />
      </Typography>
      <Typography component="div">
          <AddBoxSharpIcon/>
          <HomeSharpIcon/>
          <NotificationsSharpIcon/>
          <AccountCircleSharpIcon/>
     </Typography>
  </Box>


}

