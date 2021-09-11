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

export default function UploadModal(){
    const [images, setImages] = useState([]);
    const [isUpload, setIsUpload] = useState(false);

  const maxNumber = 1;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };
return isUpload&&<Container className={styles.modalctnr}>
    <Container className={styles.modalcancelbtn}>
    <ClearSharpIcon style={{fontSize:"32px",float:"right",margin:"10px"}}/>
    </Container><br/>
    <hr/>
    <Box className={styles.txtimgctnr} >

                <Avatar  className={styles.profileavatarmodal} alt="side profile image" src={profileImage}/>
    <textarea className={styles.txtarea}  rows="5" cols="50" placeholder="write your thoughts...">
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
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image['data_url']} alt="uploaded image" width="200" /><br/>                
                <div className={styles.lastbtns}>
                    <UpdateIcon  style={{fontSize:"25px",margin:"10px"}} onClick={() => onImageUpdate(index)} />
                    <DeleteOutlineIcon   style={{fontSize:"25px",margin:"10px"}} onClick={() => onImageRemove(index)} />
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
        <br/>
        <hr/>
    <button className={styles.postbtn}>post</button>

        </Container>

}