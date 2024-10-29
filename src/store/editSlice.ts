import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface EditState {
  [key: string]: boolean;
}

const initialState: EditState = {
  command: false,
  repoUrl: false,
};

export const editSlice = createSlice({
  name: "editIcon",
  initialState,
  reducers: {
    handleChangeIcon: (
      state,
      action: PayloadAction<{ deploymentName: string; isEditing: boolean }>
    ) => {
      const { deploymentName, isEditing } = action.payload;
      state[deploymentName] = isEditing;
    },
    resetAllFields: (state) => {
      Object.keys(state).forEach((field) => {
        state[field] = false;
      });
    },
  },
});

export const { handleChangeIcon, resetAllFields } = editSlice.actions;
export default editSlice.reducer;
