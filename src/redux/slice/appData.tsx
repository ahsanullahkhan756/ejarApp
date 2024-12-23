import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface initialStateTypes {
  homeData: [] | null;
  filterData: [] | null;
}
const initialState: initialStateTypes = {
  homeData: null,
  filterData: null,
};

const appSlice = createSlice({
  name: "appData",
  initialState,
  reducers: {
    setHomeData(state, action: PayloadAction<any>) {
      state.homeData = action.payload;
    },
    setFilterData(state, action: PayloadAction<any>) {
      state.filterData = action.payload;
    },
  },
});

export const { setHomeData, setFilterData } = appSlice.actions;
export default appSlice.reducer;
