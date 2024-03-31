import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UiPayload, UiState } from "../../entities/vite-env";

const uiState: UiState = {
  loading: false,
  modal: {
    title: "",
    message: "",
    buttonText: "",
    open: false,
  },
  videoDownloaded: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState: uiState,
  reducers: {
    setLoading: (state) => {
      state.loading = !state.loading;
    },
    setModal: (state, action: PayloadAction<UiPayload["setModal"]>) => {
      state.modal = action.payload;
    },
    setVideoDownloaded: (state) => {
      state.videoDownloaded = !state.videoDownloaded;
    },
  },
});

export const { setLoading, setModal, setVideoDownloaded } = uiSlice.actions;

export default uiSlice.reducer;
