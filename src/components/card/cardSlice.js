import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";
import { URL } from "../../cofig/config";


/*
fetches all the posts (user with following list people's posts .)
*/
export const fetchPosts = createAsyncThunk('user/posts',
async (userid)=>{
    try{
        const {data} = await axios.get(`${URL}/user/posts/${userid}`);    
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
        await axios.post(`${URL}/user/addpost`,newPost);
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
        await axios.post(`${URL}/user/likepost`,currentPost);
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
        await axios.post(`${URL}/user/removepostlike`,currentPost);
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
          const {data} =  await axios.post(`${URL}/user/deletepost/${postid}`);
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
        const {data} = await axios.get(`${URL}/userprofile/`);
        return data;
    }catch(error){
        console.log("error fetching users profile ",error);
    }
})

/*
fetch post liked people details
*/
export const loadPostLikedDetails = createAsyncThunk('postlikes/postid',

async (postid)=>{
    try{
        const {data} = await axios.get(`${URL}/user/postlikes/${postid}`);
        return data;
    }catch(error){
        console.log("error fetching post liked users details ",error);
    }
})


 const cardSlice = createSlice({
    name:'posts',
    initialState:{
        posts:[],
        loading:true,
        loadingUsers:true,
        usersProfile:[],
        likeModalToggle:false,
        postlikes:[],
        loadinglikesDetails:true,
        loadinglikesDetailsError:''
    },
    reducers:{
            likeModalToggleUtil:(state,action)=>{
                state.likeModalToggle=action.payload;
            }
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
    },
    [loadPostLikedDetails.pending]:(state)=>{
        state.loadinglikesDetails=true;
    },
    [loadPostLikedDetails.fulfilled]:(state,action)=>{
        state.loadinglikesDetails = false;
        state.postlikes=action.payload;
    },
    [loadPostLikedDetails.rejected]:(state,action)=>{
        state.loadinglikesDetails = false;
        state.loadinglikesDetailsError=action.payload;
    },
    }
});

export default  cardSlice.reducer;
export const {likeModalToggleUtil} = cardSlice.actions;
export const usePosts =()=>useSelector((state)=>state.posts);