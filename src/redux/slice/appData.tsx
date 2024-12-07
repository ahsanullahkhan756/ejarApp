import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface initialStateTypes {
  homeData: [] | null;
}
const initialState: initialStateTypes = {
  homeData: null,
};

const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setHomeData(state, action: PayloadAction<any>) {
      state.homeData = action.payload;
    },
  },
});

export const { setHomeData } = appSlice.actions;
export default appSlice.reducer;
