import React from "react";
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
export default function ProfileFeedSideCard(){


    return <Box className={styles.sideprofilectnr}>
            <Container className={styles.sideprofile}>
                <Avatar  className={styles.sideprofileavatar} alt="side profile image" src={profileImage}/>
                <Typography component="div">
                <Typography component="h1">Nagaraj</Typography>
                <Typography component="h2">Nagaraju Rathna</Typography>
                </Typography>
            </Container>
          <Container>
                <Typography component="p">Suggestions For You</Typography>
            </Container>
            <Container className={styles.sideprofile}>
                <Avatar  className={styles.sideprofileavatar} alt="side profile image" src={profileImage}/>
                <Typography component="div">
                <Typography component="h1">batman._.1</Typography>
                <Typography component="h2">Bruce Wayne</Typography>
                </Typography>
            </Container>

       
            
    </Box>


}