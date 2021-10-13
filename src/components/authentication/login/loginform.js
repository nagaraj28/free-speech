import React,{useState,useEffect} from "react";
import {Box,TextField,Typography,Button} from "@material-ui/core";
//import styles from "./loginform.module.css";
import { useHistory } from "react-router";
import { useAuthenticationDetails } from "../authenticationSlice";
import { useDispatch } from "react-redux";
import { validatecredentials } from "../authenticationSlice";
import {Link} from "react-router-dom";
import styles from "../../profileedit/profileedit.module.css";



export default function LoginForm(){
    const dispatch = useDispatch();     
    const history = useHistory();
     const [loginEmailAndPassword,setLoginEmailAndPassword] = useState({
         email:"",
         password:""
     });
     const {loginError,loadinguserid} = useAuthenticationDetails();
   //  if(loadinguserid===false&&loggeduserid&&loggeduserid!=="wrong credentials,please check!"&&loggeduserid!=="error logging in"&&loggeduserid!=="processing")
    //history.push('/');
   /* useEffect(()=>{
      if(loadinguserid===false&&loggeduserid&&loggeduserid!=="wrong credentials,please check!"&&loggeduserid!=="error logging in"&&loggeduserid!=="processing")
      history.push('/');

    },[loggeduserid]);*/
        const handleSubmit = ()=>{
                console.log(loginEmailAndPassword.email,loginEmailAndPassword.password);
                dispatch(validatecredentials(loginEmailAndPassword));
        }
    return <Box className={styles.updatectnr} component="form" >
           <Typography className={styles.updateheader}>
            Log In 
        </Typography>
                     <TextField className={styles.updatetextfield} id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{
                         e.preventDefault();
                         setLoginEmailAndPassword({
                            ...loginEmailAndPassword,
                            email:e.target.value,
                            password:loginEmailAndPassword.password
                        })
                     } } /><br/>
                     <TextField  className={styles.updatetextfield} id="outlined-basic-password" label="Password" variant="outlined" type="password"  onChange={(e)=>{
                                                 e.preventDefault();
                        setLoginEmailAndPassword({
                            ...loginEmailAndPassword,
                            email:loginEmailAndPassword.email,
                            password:e.target.value,
                        })
                     } }/>
                     <br/>
                     <Button className={styles.updatebtn} variant="outlined" disabled={!(loginEmailAndPassword.email.length>0&&loginEmailAndPassword.password.length>0)}  onClick={()=>{handleSubmit()}}>login</Button>
                     {(loginError==="wrong credentials,please check!"||loginError==="error logging in"||loginError==="processing")&&<Typography style={{color:"#0C4A6E"}} className={styles.updateheader} >
    {loginError}
 </Typography>
}
                     <p>Don't have an account create <Link to="/signup">here</Link></p>
         </Box>
}