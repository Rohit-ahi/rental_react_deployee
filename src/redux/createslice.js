

import { createSlice } from "@reduxjs/toolkit";
import { Loginuser } from "../components/Auth";


const Loginslice = createSlice({
      name : 'user',
      initialState : {
          token : localStorage.getItem('token')||null,
          role : localStorage.getItem('role')||null ,
          status : 'idel' , 
          error :   null ,
          username : null    
      },
      
      reducers : {
                         clearToken: (state) => {
                             state.status = 'idel';
                             state.token = null;
                             state.role = null
                             localStorage.removeItem('token')
                             localStorage.removeItem('role')
                         },
        },

      extraReducers : (builder)=> {

          builder 

            .addCase(Loginuser.pending , (state)=>{
                  state.status = 'loading'
             })
            .addCase(Loginuser.fulfilled , (state,action)=>{
                state.status = 'succeeded'
                state.token = action.payload.token
                state.role = action.payload.role;
                localStorage.setItem('token',action.payload.token)
                localStorage.setItem('role',action.payload.role)   
            })

            .addCase(Loginuser.rejected , (state,action)=>{
                state.status = 'failed'
                state.error  = action.payload
            })
      }       
})

export default Loginslice.reducer
export const {clearToken} = Loginslice.actions


