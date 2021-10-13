import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { useSelector, } from "react-redux";
import axios from "axios";
import { URL } from "../../cofig/config";

    export const validatecredentials = createAsyncThunk('users/verifycredentials',
    async (loginDetails)=>{
    //    console.log(loginDetails);
        try{
            const {data} = await axios.post(`${URL}/users/verifycredentials`,loginDetails);
          return data;
        }catch(error){
            console.log("error in login request",error);
            return error;
        }
    }
    );
 
    export const loaduserDetails = createAsyncThunk('userprofile/byuserid/userid',
    async (userid)=>{
        try{
            const {data} = await axios.get(`${URL}/userprofile/byuserid/${userid}`);
            return data;
        }catch(error){
            console.log("error in login request",error);
            return error;
        }
    }
    );

       //verify token details
   export const validatetoken = createAsyncThunk('users/tokenvalid',
   async ()=>{
       const token = localStorage.getItem('x-auth-token');
       console.log(token);
       try{
           const {data} = await axios.get(`${URL}/users/tokenvalid`,{headers:{
               "x-auth-token":token
           }
       });
         return data;
       }catch(error){
           console.log("error while verifying token request",error);
           return error;
       }
   }
   )

    export  const createAccount  = createAsyncThunk("users/add",
    async(profileData)=>{
        try{
         const {data} =  await axios.post(`${URL}/users/add`,profileData);
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
        creatingAccount:'',
        tokenGenerated:''
    },
    reducers:{
        resetUser:(state)=>{
            state.adminUserDetails={};
            state.loggeduserid='';
            state.loadinguserid=false;
            state.loadingLoginDetails=true;
            state.loginError='';
            state.creatingAccount='';
            state.tokenGenerated=''
        }
    },
        extraReducers:{
            [validatecredentials.pending]:(state)=>{
                   state.loadinguserid=true;
                    state.loginError="processing";
                    console.log("h1");
            },
            [validatecredentials.fulfilled]:(state,action)=>{
                console.log("h2",action.payload);
                state.loadinguserid=true;
                state.loginError='';
                if(action.payload==="wrong credentials,please check!")
                state.loginError=action.payload;
                else
                state.loginError='';
                
               const {token} =action.payload;
               if(token){
                state.tokenGenerated=token;
               localStorage.setItem("x-auth-token",token);
               }
               else{
                state.loadinguserid=false;
                localStorage.setItem("x-auth-token",null);  
               }
            },
            [validatecredentials.rejected]:(state)=>{
                console.log("h3");
                state.loadinguserid=false;
        },
            [validatetoken.pending]:(state)=>{
                console.log("h11");
            state.loadinguserid=false;
            state.loginError="processing";
              },
            [validatetoken.fulfilled]:(state,action)=>{
                console.log("h22");

             state.loadinguserid=false;
            state.loggeduserid = action.payload.id;
            loaduserDetails(action.payload.id);
              },
            [validatetoken.rejected]:(state)=>{
                console.log("h23")
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
export const {resetUser} = authenticationSlice.actions;
export const useAuthenticationDetails= ()=>useSelector((state)=>state.authenticationDetails);