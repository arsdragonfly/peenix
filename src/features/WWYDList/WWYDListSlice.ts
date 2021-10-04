import { WWYD } from "../../model";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface WWYDListState {
  WWYDList: WWYD[];
}

const initialState: WWYDListState = {
  WWYDList: []
};

export const WWYDListSlice = createSlice({
  name: "WWYDList",
  initialState,
  reducers: {
    addWWYD: (state, action: PayloadAction<WWYD>) => {
      state.WWYDList.push(action.payload);
    },
    deleteWWYD: (state, action: PayloadAction<WWYD["id"]>) => {
      state.WWYDList = state.WWYDList.filter((t) => t.id !== action.payload);
    }
  }
});

export const { addWWYD, deleteWWYD } = WWYDListSlice.actions;

export const selectWWYDList = (state: RootState): WWYD[] =>
  state.WWYDList.WWYDList;

export default WWYDListSlice.reducer;
