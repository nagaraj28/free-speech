import React,{useState} from "react";
import styles from "./profileminicard.module.css";
import profileImage from "../../assets/image9.jpg";
import {Container,Avatar,Typography,Button, Box} from "@material-ui/core";
import {Link} from "react-router-dom";

export default function ProfileMiniCard({profile}){

    const {username,avatar,fullname} = profile;
    const [isFollowing,setIsFollowing] = useState(false);
    const colors = ["#DC2626","#4D7C0F","#0E7490","#1E40AF","#BE185D"];
    const colorIndex = Math.floor(Math.random() * 5);


    return (
            <Box className={styles.minictnr}>
          <Container className={styles.searchprofile} > 
          <Link style={{textDecoration:"none",color:"#1C1917"}} to={`/profile/${username}`}  >
                {
                (avatar&&avatar.length>0)?
                <Avatar  className={styles.searchprofileavatar} alt="search profile image" src={profileImage}/>:
                <Avatar className={styles.searchprofileavatar}  style={{backgroundColor:colors[colorIndex]}} >{fullname[0]}</Avatar>
            }
            </Link>
                      <Link style={{textDecoration:"none",color:"#1C1917"}} to={`/profile/${username}`}  >
                <Typography component="div">
                <Typography component="h1">{username}</Typography>
                <Typography component="h2">{fullname}</Typography>
                </Typography>
                </Link>

            </Container>
                <Box>
                {isFollowing?<Button className={styles.userutilbtn} onClick={()=>{setIsFollowing(false)}}>following</Button>:
                <Button className={styles.userutilbtn} onClick={()=>{setIsFollowing(true)}}>follow</Button>
        }
                </Box>
              </Box>
      
    )
}