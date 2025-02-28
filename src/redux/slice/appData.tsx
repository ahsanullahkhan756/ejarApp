import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface initialStateTypes {
  homeData: [] | null;
  filterData: [] | null;
  filters: any;
}
const initialState: initialStateTypes = {
  homeData: null,
  filterData: null,
  filters: {},
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
    setFilters(state, action: PayloadAction<any>) {
      state.filters = action.payload;
    },
  },
});

export const { setHomeData, setFilterData,setFilters } = appSlice.actions;
export default appSlice.reducer;
