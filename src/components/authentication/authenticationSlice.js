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
    )

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

    },
    reducer:{
        resetUser:(state)=>{
            state.adminUserDetails={};
            state.loggeduserid='';
            state.loadinguserid=true;
            state.loadingLoginDetails=true;
        },
    },
        extraReducers:{
            [validatecredentials.pending]:(state,action)=>{
                    state.loadinguserid=false;
                    state.loginError=action.payload;

            },
            [validatecredentials.fulfilled]:(state,action)=>{
                console.log("hello");
                state.loadinguserid=false;
                state.loggeduserid = action.payload;
                loaduserDetails(action.payload);
            },
            [validatecredentials.rejected]:(state)=>{
                console.log("hello");
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
        [loaduserDetails.rejected]:(state)=>{   
            state.loadingLoginDetails=true;
    }
        }
})

export default authenticationSlice.reducer;
export const useAuthenticationDetails= ()=>useSelector((state)=>state.authenticationDetails);