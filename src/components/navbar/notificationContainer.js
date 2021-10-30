import React, { useEffect } from "react";
import {Box} from "@material-ui/core";
import styles from "./navbar.module.css";
import {loadingUserFollowing, useUserProfileDetails} from "../userProfile/userProfileSlice";
import {useAuthenticationDetails} from "../authentication/authenticationSlice";
import ProfileMiniCard from "../profileminicard/profileminicard";
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import {useDispatch} from "react-redux";
import {notificationModalUtil,useNotificationModal} from "./notificationSlice";



export default function NotificationContainer(){
    const {loggeduserid} = useAuthenticationDetails();
    const {loadingFollowing,userFollowing} = useUserProfileDetails();
    const {isNotification} = useNotificationModal();
    const dispatch = useDispatch();
    const months = ["jan","feb","mar","apr","may","june","july","aug","sept","oct","nov","dec"]


    useEffect(()=>{
        dispatch(loadingUserFollowing(loggeduserid));
    },[])


    console.log(userFollowing.followingData)
    return  isNotification&&<Box className={styles.notificationctnr}>
                <ClearSharpIcon className={styles.notifycancel} style={{fontSize:"32px",float:"right"}}  onClick={()=>{
                    dispatch(notificationModalUtil(false));
                }}/>
                {
                (loadingFollowing===false&&userFollowing&&userFollowing.length!==0&&userFollowing.followingData.length>0)?<Box className={styles.notisubctnr}>{                
                                userFollowing.followingData.map((profile,index)=>{
                                    let   times =  userFollowing.timesArray[1];
                                    times =times.split("-");
                                  const date={
                                      year:times[0],
                                      month:months[parseInt(times[1])],
                                      day:times[2].substring(0,2)
                                  }
                                  return  <ProfileMiniCard profile={profile} page="notification" date={date}/>
                                })
                            }
                                            </Box>:"no notifications yeta"
                                        }

            </Box>

}