import React,{useState} from "react";
import {Box,Typography,TextField,Avatar,Button} from "@material-ui/core";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { useAuthenticationDetails } from "../authentication/authenticationSlice";
import styles from "./profileedit.module.css";
import { CameraAltOutlined } from "@material-ui/icons";
import { useUpadatedProfileDetails ,updateUserProfile} from "./profileEditSlice";
import { useUserProfileDetails } from "../userProfile/userProfileSlice";
import {useDispatch} from "react-redux"; 

export default function ProfileEdit(){


    
    const {isUpdating,updateMessage} = useUpadatedProfileDetails();
    const {loggeduserid,adminUserDetails} = useAuthenticationDetails();
    const [formInputs,setFormInputs] =useState(adminUserDetails);
    const [image,setImage] = useState(adminUserDetails.avatar);
    const dispatch = useDispatch();
    console.log(updateMessage);
    const handleChange = (event)=>{
        event.preventDefault();
        const name = event.target.name;
        let value;
        if(name==="avatar"){
            var reader = new FileReader();
           reader.readAsDataURL(event.target.files[0]);
           reader.onloadend  =  function(){
           setImage(reader.result);
        };
        }
        else{
         value= event.target.value;
        setFormInputs(values => ({...values, [name]: value}))
        }
    }


    const handleSubmit = (event)=>{
        event.preventDefault();
        const profileData = {
            _id:formInputs._id,
            userid:formInputs.userid,
            username:formInputs.username,
            fullname:formInputs.fullname,
            avatar:image,
            bio:formInputs.bio,
            link:formInputs.link
        }
      //  console.log(profileData);
       dispatch(updateUserProfile(profileData))
    }
    
    return <Box className={styles.updatectnr}>
        <Typography className={styles.updateheader}>
            update your Profile
        </Typography>
<form>
{(image&&image.length>0)?<Avatar className={styles.userprofileavatar} alt="user profile image" src={image}/>:
                 <AccountCircleSharpIcon className={styles.userprofileavatar}/>
}  

 <label ><CameraAltOutlined/><TextField id="outlined-basic" label="Email" variant="outlined" type="file" size="50" style={{size:"50",display:"none"}} name="avatar"  accept="image/png,image/jpeg" onChange={handleChange}/></label><br/>
    <TextField id="outlined-basic" label="username" variant="outlined" className={styles.updatetextfield} type="text-field" name="username" placeholder="username" value={formInputs.username || ""} disabled/><br/>
    <TextField id="outlined-basic" label="fullname" variant="outlined" className={styles.updatetextfield} type="text-field" name="fullname"  placeholder="fullname" value={formInputs.fullname || ""} onChange={handleChange}/><br/>
    <TextField  id="outlined-basic" label="bio" variant="outlined" className={styles.updatetextfield} type="text" name="bio" placeholder="bio" value={formInputs.bio || ""} onChange={handleChange}/><br/>
    <TextField id="outlined-basic" label="link" variant="outlined" className={styles.updatetextfield} type="text-field" name="link" placeholder="website" value={formInputs.link || ""} onChange={handleChange}/><br/>
    <Button className={styles.updatebtn} onClick={handleSubmit}>update</Button>
    </form>
    <Typography style={{color:"#0C4A6E"}} className={styles.updateheader}>
     {updateMessage}
 </Typography>
    </Box>
    

}