import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {useSelector} from "react-redux";

const notificationSlice= createSlice({
        name:"notificationmodal",
        initialState:{
            isNotification : false,
        },
        reducers:{
            notificationModalUtil:(state,action)=>{
             state.isNotification =action.payload;
            }
        }
})


export default notificationSlice.reducer;
export const {notificationModalUtil} = notificationSlice.actions;
export const useNotificationModal = ()=>useSelector((state)=>state.notificationModal);