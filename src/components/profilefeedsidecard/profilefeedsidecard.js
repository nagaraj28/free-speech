import React, { useEffect } from "react";
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import { Box } from "@material-ui/core";
import profileImage from "../../assets/image9.jpg";
import { Container ,Button} from "react-bootstrap";
import styles from "./profilefeedsidecard.module.css";
import ProfileMiniCard from "../profileminicard/profileminicard";
import {useAuthenticationDetails} from "../authentication/authenticationSlice";
import {usePosts} from "../card/cardSlice";

export default function ProfileFeedSideCard(){

 
    const {adminUserDetails} = useAuthenticationDetails();

    const {usersProfile} = usePosts();

    //console.log(userDetails);

    return <Box className={styles.sideprofilectnr}>
            <Container className={styles.sideprofile}>
               {/* <Avatar  className={styles.sideprofileavatar} alt="side profile image" src={profileImage}/>
                <Typography component="div">
                <Typography component="h1">Nagaraj</Typography>
                <Typography component="h2">Nagaraju Rathna</Typography>
                </Typography>*/}
                <ProfileMiniCard profile={adminUserDetails} page="homefeedprofile" />
            </Container>
          <Container>
                <Typography style={{marginLeft:"18px"}}component="p">Suggestions For You</Typography>
            </Container>
            <Container className={styles.sideprofilesuggestion}>
                {
            usersProfile&&usersProfile.length>0&&usersProfile.map((profile,index)=>{
          //  index>=5&&break;
                return index<5&&<ProfileMiniCard profile={profile} page="home" />
            })
                }
               {/* <Avatar  className={styles.sideprofileavatar} alt="side profile image" src={profileImage}/>
                <Typography component="div">
                <Typography component="h1">batman._.1</Typography>
                <Typography component="h2">Bruce Wayne</Typography>
                </Typography>
            */}
            
            </Container>

       
            
    </Box>


}