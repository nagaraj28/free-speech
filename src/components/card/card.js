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
import styles from "./card.module.css";
import { Box } from "@material-ui/core";
import Image from "../../assets/image9.jpg";


export default function PostCard(){

    let arr=[1,2,3];

  return <Box className={styles.postsctnr}> 
       {   arr.map(item=>{
      return  <Card className={styles.postctnr}>
    <CardContent>
          <IconButton aria-label="settings">
      <AccountCircleSharpIcon/>
      </IconButton>
         <Typography component="span" >
        Nagraj
      </Typography>
      </CardContent>
    {/*  <img  className="responsive-img" src={Image} /> */}
      <CardMedia
       className={styles.imgctnr}
        image={Image}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if  like.
        </Typography>
       
      </CardContent>
      <CardActions>
      <FavoriteBorderSharpIcon/> 
      </CardActions>
      <Typography variant="body2" color="textSecondary" component="a">
        Be the first one to like.
        </Typography>
       </Card>
       })
}
  </Box>
 


}

