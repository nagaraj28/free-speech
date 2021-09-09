import React from "react";
import NavBar from "../components/navbar/navbar";
import PostCard from "../components/card/card";


export default function Home(){


    return (<>
        <NavBar />
        <div style={{height:"100vh" , overflowY:"auto",marginRight:"50px"}}> 
        <PostCard/>
        <PostCard/>
        <PostCard/>
        </div>
       

        </>);
}