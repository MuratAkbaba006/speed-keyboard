import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const FetchRandomTextAsync = createAsyncThunk(
  "text/FetchRandomTextAsync",
  async () => {
    const response = await axios.get("https://loripsum.net/api/1/medium/plaintext/");
    return response.data;
  }
);

export const TextSlice = createSlice({
  name: "text",
  initialState: {
    status: "idle",
    spliceText: [],
    error: null,
    currentWordIndex: 0,
    trueWord: [],
    falseWord: [],
    reset: false,
  },
  reducers: {
    increaseCurrentWordIndex: (state, action) => {
      state.currentWordIndex = state.currentWordIndex + 1;
    },
    addTrueWord: (state, action) => {
      state.trueWord.push(action.payload);
    },
    addFalseWord: (state, action) => {
      state.falseWord.push(action.payload);
    },
    resetAll: (state, action) => {
      state.trueWord = [];
      state.falseWord = [];
      state.currentWordIndex = 0;
      state.status = "idle";
      state.reset = !state.reset;
    },
  },
  extraReducers: {
    [FetchRandomTextAsync.pending]: (state, action) => {
      state.status = "loading";
    },
    [FetchRandomTextAsync.fulfilled]: (state, action) => {
      state.status = "succeded";
      state.text = action.payload;
      state.spliceText = action.payload.split(" ");
    },
    [FetchRandomTextAsync.rejected]: (state, action) => {
      state.error = action.error.message;
      state.status = "error";
    },
  },
});

export const { increaseCurrentWordIndex, addTrueWord, addFalseWord, resetAll } =
  TextSlice.actions;
export default TextSlice.reducer;
