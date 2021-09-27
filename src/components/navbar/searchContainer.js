import React from "react";
import {Box} from "@material-ui/core";
import ProfileMiniCard from "../profileminicard/profileminicard";
import styles from "./navbar.module.css";
import {findUsers} from "./utils/searchUsers";


export default function SearchContainer({searchedprofiles}){
    return (
        <Box className={styles.searchctnr}>
          {
              searchedprofiles&&searchedprofiles.length>0&&searchedprofiles.map(profile=>{
             return <ProfileMiniCard profile={profile} page="home"/>
              }
              )
          }
        </Box>
    )
}