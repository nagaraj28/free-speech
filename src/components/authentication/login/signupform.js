import React,{useState} from "react";
import {Box,Typography,TextField,Avatar,Button} from "@material-ui/core";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { useAuthenticationDetails,createAccount } from "../authenticationSlice";
import { CameraAltOutlined } from "@material-ui/icons";
import { useUpadatedProfileDetails ,updateUserProfile} from "../../profileedit/profileEditSlice";
import {useDispatch} from "react-redux"; 
import styles from "../../profileedit/profileedit.module.css";
import {Link} from "react-router-dom";


export default function SignUpForm(){

    const {creatingAccount} = useAuthenticationDetails();
    const [formInputs,setFormInputs] =useState({});
   // const [image,setImage] = useState(adminUserDetails.avatar);

    const dispatch = useDispatch();
  //  console.log(updateMessage);
    const handleChange = (event)=>{
        event.preventDefault();
        const name = event.target.name;
        const value= event.target.value;
        setFormInputs(values => ({...values, [name]: value}))
    }

    

    const handleSubmit = (event)=>{
        event.preventDefault();
       dispatch(createAccount(formInputs))
    }

    
    return <Box className={styles.updatectnr}>
        <Typography className={styles.updateheader}>
            create your account
        </Typography>
<form>
    
{/*(image&&image.length>0)?<Avatar className={styles.userprofileavatar} alt="user profile image" src={image}/>:
                 <AccountCircleSharpIcon className={styles.userprofileavatar}/>
                 */
}  


 {/*<label ><CameraAltOutlined/><TextField id="outlined-basic" label="Email" variant="outlined" type="file" size="50" style={{size:"50",display:"none"}} name="avatar"  accept="image/png,image/jpeg" onChange={handleChange}/></label><br/>*/}
    <TextField id="outlined-basic" label="email" variant="outlined" className={styles.updatetextfield} type="text-field" name="email" placeholder="email" onChange={handleChange} /><br/>
  
    <TextField id="outlined-basic" label="password" variant="outlined" className={styles.updatetextfield} type="password" name="password" placeholder="password" onChange={handleChange}/><br/>
    <TextField id="outlined-basic" label="password" variant="outlined" className={styles.updatetextfield} type="password" name="password1" placeholder="re-enter password" onChange={handleChange}/><br/>
    <Typography style={{color:"#0C4A6E"}} className={styles.updateheader} >
     {
         (formInputs.password&&formInputs.password1&&formInputs.password.length>0&&formInputs.password1.length>0&&(formInputs.password!==formInputs.password1))&&<Typography style={{color:"#DC2626",fontSize:"10px"}} >
         passwords mismatch
     </Typography>
     }

 </Typography>
    <TextField id="outlined-basic" label="username" variant="outlined" className={styles.updatetextfield} type="text-field" name="username" placeholder="username" onChange={handleChange} /><br/>
    <TextField id="outlined-basic" label="fullname" variant="outlined" className={styles.updatetextfield} type="text-field" name="fullname"  placeholder="fullname"  onChange={handleChange}/><br/>
    
    <Button className={styles.updatebtn} onClick={handleSubmit} disabled={!(formInputs.email?.length>0&&formInputs.password?.length>0&&formInputs.username?.length>0&&formInputs.fullname?.length>0)}>signup</Button>
    </form>
    <Typography style={{color:"#0C4A6E"}} className={styles.updateheader} >
     {creatingAccount}
 </Typography>
    <p>Already have a account <Link to="/login">Sign-In</Link></p>
    </Box>
    


}