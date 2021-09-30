import React, { useEffect ,useState} from "react";
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import styles from "./card.module.css";
import { DeleteSharp } from "@material-ui/icons";
import { Box } from "@material-ui/core";
import Image from "../../assets/image9.jpg";
import {loadLikePost,loadremoveLikeFromPost,loaddeletepost} from "./cardSlice";
import {useAuthenticationDetails} from "../authentication/authenticationSlice";

export default function CardData({post,place,avatar,username}){
        const dispatch = useDispatch();
        const [isLiked,setIsLiked] = useState(false);
        const [isPostDeleted,setIsPostDeleted] = useState(false);
        const [totalLikes,setTotalLikes] = useState(post.likes);
        const {loggeduserid} = useAuthenticationDetails();
        useEffect(()=>{
            setIsLiked(()=>{
              return totalLikes.includes(loggeduserid);
            })
        },[])
        // console.log({avatar,username});


    return <Card className={styles.postctnr+" "+(isPostDeleted&&styles.postctnrfadeout)}>        
    <CardContent>
          <IconButton aria-label="settings">
        { (avatar&&avatar.length>0)?<Avatar  alt="side profile image" src={avatar}/>:<AccountCircleSharpIcon/>}
      </IconButton>
         <Typography component="span" >
        {username}
      </Typography>
      </CardContent>
    {/*  <img  className="responsive-img" src={Image} /> */}
    <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
         {
         post.caption}
        </Typography>
       
      </CardContent>
      {post.postimg&&<CardMedia
       className={styles.imgctnr}
        image={/*Image*/post.postimg}
        title="Paella dish"
      />
       }
            {isPostDeleted&&<Typography className={styles.postdeletetxt} compnent="span">post deleted...</Typography>}
      {!isPostDeleted&&<CardActions className={styles.cardbtns} >
      {!isLiked?<FavoriteBorderSharpIcon   style={{fontSize:"30px"}}  onClick={()=>{
        const currentPost = {
          postid:post._id,
          userid:loggeduserid
        }
          console.log(currentPost);
          dispatch(loadLikePost(currentPost));
          setIsLiked(true);
          setTotalLikes(()=>{
          if(totalLikes.length===0){
          const likes= [loggeduserid];
          return likes;
          }else{
          const likes = [...totalLikes,loggeduserid];
          return likes;
          }})
      }}/>:<FavoriteIcon label="Disabled" style={{color:"#EF4444",fontSize:"30px"}} onClick = {()=>{
        
           const currentPost = {
            postid:post._id,
            userid:loggeduserid
          }
           setIsLiked(false);
           console.log(currentPost);           
           dispatch(loadremoveLikeFromPost(currentPost));
           setTotalLikes(()=>{
            const likes = totalLikes.filter(user=>user!==loggeduserid);
            return likes;
        })
       }}  />}
       {(place!=="home"&&post.userid===loggeduserid)&&<DeleteSharp style={{color:"#991B1B",fontSize:"30px"}} onClick={()=>{
         dispatch(loaddeletepost(post._id));
         setIsPostDeleted(true);
       }} />}
      </CardActions> 
}
      {(totalLikes&&totalLikes.length>0)?<Typography variant="body2" color="textSecondary" component="a"> {!(isPostDeleted)&&`${totalLikes.length} likes`}</Typography>:<Typography variant="body2" color="textSecondary" component="a">
        {!isPostDeleted&&"Be the first one to like."}
        </Typography>
       }
       </Card>;
}