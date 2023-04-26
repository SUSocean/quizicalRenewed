import { configureStore } from "@reduxjs/toolkit";
import { questionsSlice } from "../features/questionsSlice";
export const store = configureStore({
    reducer: {
        questions: questionsSlice.reducer
    }
})