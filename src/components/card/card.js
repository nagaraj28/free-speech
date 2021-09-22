import React, { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
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
import {fetchPosts,usePosts} from "./cardSlice";


export default function PostCard(){
  const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchPosts('613f5757976e93d14ff39160'));
    },[])
    
    const {loading,posts} =usePosts();
    console.log(loading,posts);

  return <Box className={styles.postsctnr}> 
       {   posts&&posts.map(post=>{
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
    <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {/* This impressive paella is a perfect party dish and a fun meal to cook together with your
          guests. Add 1 cup of frozen peas along with the mussels, if  like.
          */
         post.caption}
        </Typography>
       
      </CardContent>
      {post.postimg&&<CardMedia
       className={styles.imgctnr}
        image={/*Image*/post.postimg}
        title="Paella dish"
      />
       }
     
      <CardActions>
      <FavoriteBorderSharpIcon/> 
      </CardActions>
      {(post.likes.length>0)?<Typography variant="body2" color="textSecondary" component="a"> {post.likes.length} likes</Typography>:<Typography variant="body2" color="textSecondary" component="a">
        Be the first one to like.
        </Typography>
       }
       </Card>
       })
}
  </Box>


}

