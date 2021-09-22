import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {useSelector} from "react-redux";
import axios from "axios";

const uploadModalSlice = createSlice({
        name:"uploadmodal",
        initialState:{
            isModalOpen : false,
        },
        reducers:{
            uploadModalToggle:(state)=>{
             state.isModalOpen = !(state.isModalOpen);
            }
        }

})


export default uploadModalSlice.reducer;
export const {uploadModalToggle} = uploadModalSlice.actions;
export const useUploadModal = ()=>useSelector((state)=>state.uploadModal);