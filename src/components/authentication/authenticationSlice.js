import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";


    export const validatecredentials = createAsyncThunk('users/verifycredentials',
    async (loginDetails)=>{
    //    console.log(loginDetails);
        try{
            const {data} = await axios.post("http://localhost:5000/users/verifycredentials",loginDetails);
          return data;
        }catch(error){
            console.log("error in login request",error);
            return error;
        }
    }
    )
    export const loaduserDetails = createAsyncThunk('userprofile/byuserid/userid',
    async (userid)=>{
        try{
            const {data} = await axios.get(`http://localhost:5000/userprofile/byuserid/${userid}`);
            return data;
        }catch(error){
            console.log("error in login request",error);
            return error;
        }
    }
    );

    export  const createAccount  = createAsyncThunk("users/add",
    async(profileData)=>{
        try{
         const {data} =  await axios.post("http://localhost:5000/users/add",profileData);
         return data;
    }catch(err){
        console.log(err);
    }
    });


const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        adminUserDetails:{
            _id:'',
            userid:'',
            username:'',
            fullname:'',
            followers: [],
            following: [],
        },
        loggeduserid:'',
        loadinguserid:true,
        loginError:'',
        loadingLoginDetails:true,
        creatingAccount:''
    },
    reducer:{
        resetUser:(state)=>{
            state.adminUserDetails={};
            state.loggeduserid='';
            state.loadinguserid=false;
            state.loadingLoginDetails=true;
        },
    },
        extraReducers:{
            [validatecredentials.pending]:(state,action)=>{
                    state.loadinguserid=false;
                    state.loggeduserid="processing";

            },
            [validatecredentials.fulfilled]:(state,action)=>{
                state.loadinguserid=false;
                state.loggeduserid = action.payload;
                loaduserDetails(action.payload);
            },
            [validatecredentials.rejected]:(state)=>{
                state.loadinguserid=false;
        },
        [loaduserDetails.fulfilled]:(state,action)=>{
            state.loadingLoginDetails=false;
            state.adminUserDetails = action.payload;
        },
        [loaduserDetails.rejected]:(state)=>{
                state.loadingLoginDetails=false;
                console.log("request rejected in loading login details")
        },
        [loaduserDetails.pending]:(state)=>{   
            state.loadingLoginDetails=true;
    },
     [createAccount.fulfilled]:(state,action)=>{
         state.creatingAccount=action.payload
    },
    [createAccount.rejected]:(state)=>{
        state.creatingAccount="error occured,please try again";
            console.log("request rejected in loading login details")
    },
    [createAccount.pending]:(state)=>{   
        state.creatingAccount="creating your account,please wait...";
        }
    }
})

export default authenticationSlice.reducer;
export const useAuthenticationDetails= ()=>useSelector((state)=>state.authenticationDetails);