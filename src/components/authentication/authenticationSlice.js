import { createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";


const authenticationSlice = createSlice({
    name:'authentication',
    initialState:{
        adminUserDetails:{
            _id:'613f5799976e93d14ff39167',
            userid:'613f5799976e93d14ff39165',
            username:'nag1',
            fullname:'nagraj rathna',
            followers: ['613f5757976e93d14ff39160'],
            following: ['613f5757976e93d14ff39160']

        }
    },
    reducer:{
        resetUser:(state)=>{
            state.adminUserDetails={};
        },
    }
})

export default authenticationSlice.reducer;
export const useAuthenticationDetails= ()=>useSelector((state)=>state.authenticationDetails);