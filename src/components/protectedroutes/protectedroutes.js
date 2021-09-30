import React from "react";
import { Redirect, Route } from "react-router";
import { useAuthenticationDetails,loaduserDetails } from "../authentication/authenticationSlice";
import { useDispatch } from "react-redux";

export default function ProtectedRoutes({component:Component,...rest}) {
    const {loggeduserid} = useAuthenticationDetails();
  
    return (
     
        <Route  {...rest} render={props=>{
            console.log(loggeduserid)
            if(loggeduserid&&loggeduserid.length>0){
                return (<Component/>)
            }
            else
            return (<Redirect to={
            {
              pathname:'/login',
              state: {
                from: props.location
              }
            }
          } />)}}  />
        

    )
}