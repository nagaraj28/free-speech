import React from "react";
import NavBar from "../components/navbar/navbar";
import UploadModal from "../components/uploadmodal/uploadmodal";
import UserProfile from "../components/userProfile/userProfile";
import CardListProfile from "../components/card/cardsListProfile"
export default function Profile(){
    return <>
    <NavBar/>
    <UserProfile/>
    <UploadModal/>
  {  <CardListProfile/>}
    </>

}