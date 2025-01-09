import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  email: string;
  password: string;
}

const initialState: FormState = {
  email: "",
  password: "",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setEmail, setPassword, resetForm } = formSlice.actions;
export default formSlice.reducer;
