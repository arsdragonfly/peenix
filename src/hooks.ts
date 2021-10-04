import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch = (): Dispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
