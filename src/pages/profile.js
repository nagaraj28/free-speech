import React,{useEffect} from "react";
import NavBar from "../components/navbar/navbar";
import UploadModal from "../components/uploadmodal/uploadmodal";
import UserProfile from "../components/userProfile/userProfile";
import CardListProfile from "../components/card/cardsListProfile";
import FollowingOrFollowers from "../components/followingOrfollowers/followingOrfollowers";
import { useDispatch } from "react-redux";
import {loggeduserid,useAuthenticationDetails,loaduserDetails } from "../components/authentication/authenticationSlice";


export default function Profile(){  
   /* const dispatch = useDispatch();
    const {loggeduserid} = useAuthenticationDetails();
    if(loggeduserid)
    dispatch(loaduserDetails(loggeduserid));
    */
    return <>
    <NavBar/>
    <UploadModal/>
    <UserProfile/>
    <FollowingOrFollowers/>
    <CardListProfile/>


  {/*  

  */ }
    </>
}