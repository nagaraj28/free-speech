import React,{useState} from "react";
import Avatar from '@material-ui/core/Avatar';
import { Box } from "@material-ui/core";
import profileImage from "../../assets/image9.jpg";
import { Container } from "react-bootstrap";
import ImageUploading from 'react-images-uploading';
import ClearSharpIcon from '@material-ui/icons/ClearSharp';
import PermMediaSharpIcon from '@material-ui/icons/PermMediaSharp';
import UpdateIcon from '@material-ui/icons/Update';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import styles from "./uploadmodal.module.css";
import {useUploadModal,uploadModalToggle} from "./uploadModalSlice";
import {useDispatch } from "react-redux";
import {uploadPost} from "../card/cardSlice";
import { useAuthenticationDetails } from "../authentication/authenticationSlice";

export default function UploadModal(){
  const dispatch = useDispatch();
    const [images, setImages] = useState();
    const [caption, setCaption] = useState([]);
  const {adminUserDetails} = useAuthenticationDetails();
       const {isModalOpen} = useUploadModal();
      // console.log("modal value is" ,isModalOpen)
  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
return isModalOpen&&<Container className={styles.modalctnr}>
    <Container className={styles.modalcancelbtn} onClick = {()=>{dispatch(uploadModalToggle())}}>
    <ClearSharpIcon style={{fontSize:"32px",float:"right",margin:"10px"}}/>
    </Container><br/>
    <hr/>
    <Box className={styles.txtimgctnr} >

                <Avatar  className={styles.profileavatarmodal} alt="side profile image" src={profileImage}/>
    <textarea className={styles.txtarea}  rows="5" cols="50" placeholder="write your thoughts..." onChange={(e)=>{
      setCaption(e.target.value);
    }}>
  </textarea>
  </Box>
 <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
              <PermMediaSharpIcon

                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
                {...dragProps}
              /><br/>
            {imageList.map((photo, index) => (
            
              <div key={index} className="image-item">
              
                <img src={photo['data_url']} alt={`uploaded photo ${index}`} width="200" /><br/>                
                <div className={styles.lastbtns}>
                    <UpdateIcon  style={{fontSize:"25px",margin:"10px"}} onClick={() => {
                      onImageUpdate(index)
                     }} />
                    <DeleteOutlineIcon   style={{fontSize:"25px",margin:"10px"}} onClick={() => {
                      onImageRemove(index)
                      setImages(null)
                    }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
        <br/>
        <hr/>
    <button className={styles.postbtn} onClick = {()=>{
      const postimage = images?images[0].data_url:'';
      const newPost = {
        userid:adminUserDetails.userid,
        caption:caption,
        postimg:postimage,
        liked : []
      }
      console.log("new post data",newPost);
      dispatch(uploadPost(newPost))
     dispatch(uploadModalToggle())
     setImages(null);
      }}>post</button>
        </Container>
}