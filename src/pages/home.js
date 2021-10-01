import React from "react";
import NavBar from "../components/navbar/navbar";
import PostCard from "../components/card/cardsListHome";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import ProfileFeedSideCard from "../components/profilefeedsidecard/profilefeedsidecard";
import UploadModal from "../components/uploadmodal/uploadmodal";
import LikesModal from "../components/card/likesModal";
export default function Home(){


    return (<>
        <NavBar />
        <PostCard/>
        <ProfileFeedSideCard/>
        <UploadModal/>
        <LikesModal/>        
        </>);
}