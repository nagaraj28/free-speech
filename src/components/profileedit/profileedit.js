import React from "react";
import {Box,Typography,TextField,Avatar,Button} from "@material-ui/core";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { useAuthenticationDetails } from "../authentication/authenticationSlice";

import styles from "./profileedit.module.css";
import { CameraAltOutlined } from "@material-ui/icons";


export default function ProfileEdit(){

    const {adminUserDetails} = useAuthenticationDetails();
return <Box className={styles.updatectnr}>
        <Typography h2>
            update your Profile
        </Typography>
        {(adminUserDetails.avatar&&adminUserDetails.avatar.length>0)?<Avatar  className={styles.userprofileavatar} alt="user profile image" src={adminUserDetails.avatar}/>:
                 <AccountCircleSharpIcon className={styles.userprofileavatar}/>
}   <Button>    <CameraAltOutlined/>
change</Button>
<label>username <input type="text-field" placeholder="username" disabled/></label>
  <label>fullname <input type="text-field" placeholder="fullname"/></label>
    <label>your bio <input type="text" placeholder="bio"/></label>
    <label>website <input type="text-field" placeholder="website"/></label>
    <Button>update</Button>
   

    </Box>

}