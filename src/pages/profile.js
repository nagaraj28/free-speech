import React,{useEffect} from "react";
import NavBar from "../components/navbar/navbar";
import UploadModal from "../components/uploadmodal/uploadmodal";
import UserProfile from "../components/userProfile/userProfile";
import CardListProfile from "../components/card/cardsListProfile";
import FollowingOrFollowers from "../components/followingOrfollowers/followingOrfollowers";
export default function Profile(){  
 
    return <>
    <NavBar/>
    <UserProfile/>
    <UploadModal/>
    <FollowingOrFollowers/>
    <CardListProfile/>
    </>
}