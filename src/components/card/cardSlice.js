import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";


/*
fetches all the posts (user with following list people's posts .)
*/
export const fetchPosts = createAsyncThunk('user/posts',
async (userid)=>{
    try{
        const {data} = await axios.get(`http://localhost:5000/user/posts/${userid}`);    
        return data;
    }   
    catch(error){
        return error?.response;
    }
}
);

/* upload new post */
export const uploadPost = createAsyncThunk('user/addpost',
 async (newPost)=>{
    try{
        const {data} = 
        await axios.post("http://localhost:5000/user/addpost",newPost);
        return data;
    }
    catch(error){
        console.log("error uploading post",error?.response);
        return error?.response
    }
 }
);

/* add a  new like */
export const loadLikePost = createAsyncThunk('user/likepost',
 async (currentPost)=>{
    console.log("curretnPost in slice",currentPost)
    try{
        const data = 
        await axios.post("http://localhost:5000/user/likepost",currentPost);
        return data;
    }
    catch(error){
        console.log("error uploading post",error?.response);
        return error?.response
    }
 }
);
/* remove   like */
export const loadremoveLikeFromPost = createAsyncThunk('user/removepostlike',
 async (currentPost)=>{
     console.log(currentPost)
    try{
        const data = 
        await axios.post("http://localhost:5000/user/removepostlike",currentPost);
        return data;
    }
    catch(error){
        console.log("error uploading post",error?.response);
        return error?.response
    }
 }
);

/*
delete post from profile page;
*/
export const loaddeletepost = createAsyncThunk('user/deletepost/postid',
    async (postid)=>{
        try{
          const {data} =  await axios.post(`http://localhost:5000/user/deletepost/${postid}`);
          return data;
        }
        catch(err){
            console.log("error deleting post",err);
        }
    }
);

/*
fetch all the users profile like username ,bio,link,avatar etc..
*/
export const loadingusersprofile = createAsyncThunk('userprofile',

async ()=>{
    try{
        const {data} = await axios.get("http://localhost:5000/userprofile/");
        return data;
    }catch(error){
        console.log("error fetching users profile ",error);
    }
} 

)


 const cardSlice = createSlice({
    name:'posts',
    initialState:{
        posts:[],
        loading:true,
        loadingUsers:true,
        usersProfile:[]
    },
    extraReducers:{
    [fetchPosts.pending]:(state)=>{
        state.loading=true;
    },
    [fetchPosts.fulfilled]:(state,action)=>{
        state.loading = false;
        state.posts=action.payload;
    },
    [fetchPosts.rejected]:(state,action)=>{
        state.loading = false;
        state.error=action.payload;
    },
    [fetchPosts.fulfilled]:(state,action)=>{
        state.loading = false;
        state.posts=action.payload;
    },
    [uploadPost.fulfilled]:(state,action)=>{
        console.log(action.payload);
        state.loading = false;
        state.posts=[action.payload,...state.posts];
    },
    [uploadPost.rejected]:(state,action)=>{
      console.log("error uploading new post");
    },
    [loadLikePost.fulfilled]:(action)=>{
            console.log("post liked",action.payload);
    },
    [loadremoveLikeFromPost.rejected]:()=>{
        console.log("error liking post...");
    },
    [loadremoveLikeFromPost.fulfilled]:()=>{
        console.log("removed like from post");
},
[loadremoveLikeFromPost.rejected]:()=>{
    console.log("error removing like from post...");
},
    [loadingusersprofile.fulfilled]:(state,action)=>{
        state.loadingUsers=false;
        state.usersProfile=action.payload;
    },
    [loadingusersprofile.pending]:(state,action)=>{
        state.loadingUsers=true;
    },
    [loadingusersprofile.rejected]:(state,action)=>{
        state.loadingUsers=false;
    },
    [loaddeletepost.rejected]:(state,action)=>{
        console.log("error deleting post");
    },
    [loaddeletepost.fulfilled]:(state,action)=>{
       console.log("post delete success");
    }
    }
});

export default  cardSlice.reducer;
export const usePosts =()=>useSelector((state)=>state.posts);