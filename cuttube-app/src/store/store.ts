import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "@src/store/ui/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
  },
});
