import { configureStore } from "@reduxjs/toolkit";

import todoSlice from "./todoSlice";

//MIDDLEWARE
const localStorageMiddleware = ({ getState }) => {
    return (next) => (action) => {
        const result = next(action);
        localStorage.setItem("todoappv10", JSON.stringify(getState()));
        return result;
    };
};

const reHydrateStore = () => {
    if (localStorage.getItem("todoappv10") !== null) {
        return JSON.parse(localStorage.getItem("todoappv10"));
    }
};

const store = configureStore({
    reducer: {
        todo: todoSlice,
    },
    preloadedState: reHydrateStore(),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export default store;
