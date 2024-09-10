import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,  
    isLoading: false,
                       
  },
  reducers: {
    setLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },

  },
});
export const { setLoggedIn ,setIsLoading} = userSlice.actions;
export default userSlice.reducer;