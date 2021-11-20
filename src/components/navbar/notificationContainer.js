import React, { useEffect } from "react";
import {Box} from "@material-ui/core";
import styles from "./navbar.module.css";
import {loadingUserFollowers, useUserProfileDetails} from "../userProfile/userProfileSlice";
import {useAuthenticationDetails} from "../authentication/authenticationSlice";
import ProfileMiniCard from "../profileminicard/profileminicard";
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import {useDispatch} from "react-redux";
import {notificationModalUtil,useNotificationModal} from "./notificationSlice";



export default function NotificationContainer(){
    const {loggeduserid} = useAuthenticationDetails();
    const {userFollowers,loadingFollowers} = useUserProfileDetails();
    const {isNotification} = useNotificationModal();
    const dispatch = useDispatch();
    const months = ["jan","feb","mar","apr","may","june","july","aug","sept","oct","nov","dec"]


    useEffect(()=>{
        console.log(loggeduserid)
        dispatch(loadingUserFollowers(loggeduserid));
    },[])


    console.log(userFollowers.followersData)
    return  isNotification&&<Box className={styles.notificationctnr}>
                <ClearSharpIcon className={styles.notifycancel} style={{fontSize:"32px",float:"right"}}  onClick={()=>{
                    dispatch(notificationModalUtil(false));
                }}/>
                {
                (loadingFollowers===false&&userFollowers&&userFollowers.length!==0&&userFollowers.followersData.length>0)?<Box className={styles.notisubctnr}>{                
                                userFollowers.followingData.map((profile,index)=>{
                                    let   times =  userFollowers.timesArray[1];
                                    times =times.split("-");
                                  const date={
                                      year:times[0],
                                      month:months[parseInt(times[1])],
                                      day:times[2].substring(0,2)
                                  }
                                  return  <ProfileMiniCard profile={profile} page="notification" date={date}/>
                                })
                            }
                                            </Box>:"no notifications yet"
                                        }

            </Box>

}