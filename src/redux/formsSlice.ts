import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const db = getFirestore();

type FormState = {
  forms: formData[];
  status: string;
  error: string | undefined;
};

const initialState: FormState = {
  forms: [],
  status: "idle",
  error: "",
};

export const fetchForms = createAsyncThunk("forms/fetchForms", async () => {
  const querySnapshot = await getDocs(collection(db, "submitted-forms"));
  const data: formData[] = [];
  querySnapshot.forEach((doc) =>
    data.push({ ...doc.data(), id: doc.id } as formData)
  );
  return data;
});

export const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchForms.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForms.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.forms = action.payload;
      })
      .addCase(fetchForms.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default formsSlice.reducer;

export function selectAllForms(state: FormState) {
  return state.forms;
}

export function selectFormById(state: FormState, formId: string) {
  return state.forms.find((form) => form.id === formId);
}
