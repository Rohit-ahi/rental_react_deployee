
 import { createAsyncThunk } from '@reduxjs/toolkit'
 export const Loginuser = createAsyncThunk('loginuser',async (userdata, { rejectWithValue })=>{  
      const apiurl = process.env.REACT_APP_API_URL
      try {

       const response = await fetch(`${apiurl}/rental/login`,{
             method : 'POST',
             headers : {
                  'Content-Type' : 'application/json'
            },
             body : JSON.stringify(userdata)
       })
       const data =  await response.json()
       if (!data.status) {
             return  rejectWithValue(data.msg);   
       } 
           const obj = data.data
           const token = obj.token
           const role = obj.role
           return {token,role};
      } catch (error) {
          return  rejectWithValue('Server Not Found');
      }

})
      


