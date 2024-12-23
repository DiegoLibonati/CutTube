import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../entities/vite-env";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
