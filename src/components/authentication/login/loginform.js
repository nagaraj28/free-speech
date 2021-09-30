import React,{useState} from "react";
import {Box,TextField,Typography,Button} from "@material-ui/core";
import styles from "./loginform.module.css";
import { useHistory } from "react-router";
import { useAuthenticationDetails } from "../authenticationSlice";
import { useDispatch } from "react-redux";
import { validatecredentials } from "../authenticationSlice";
export default function LoginForm(){
    const dispatch = useDispatch();     
    const history = useHistory();
    
     const [loginEmailAndPassword,setLoginEmailAndPassword] = useState({
         email:"",
         password:""
     });
     const {loggeduserid} = useAuthenticationDetails();
     if(loggeduserid)
     history.push('/');

        const handleSubmit = ()=>{
                console.log(loginEmailAndPassword.email,loginEmailAndPassword.password);
                dispatch(validatecredentials(loginEmailAndPassword));
        }
    return <Box className={styles.loginctnr} component="form" >
                                        <Typography >{loggeduserid}</Typography>
                    <Typography >FreeSpeech</Typography>
                     <TextField className={styles.emailbox} id="outlined-basic" label="Email" variant="outlined" onChange={(e)=>{
                         e.preventDefault();
                         setLoginEmailAndPassword({
                            ...loginEmailAndPassword,
                            email:e.target.value,
                            password:loginEmailAndPassword.password
                        })
                     } } />
                     <TextField className={styles.passwordbox} id="outlined-basic-password" label="Password" variant="outlined" type="password"  onChange={(e)=>{
                                                 e.preventDefault();
                        setLoginEmailAndPassword({
                            ...loginEmailAndPassword,
                            email:loginEmailAndPassword.email,
                            password:e.target.value,
                        })
                     } }/>
                     <Button variant="outlined" disabled={!(loginEmailAndPassword.email.length>0&&loginEmailAndPassword.password.length>0)}  onClick={()=>{handleSubmit()}}>login</Button>
         </Box>
}