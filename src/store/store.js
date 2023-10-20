import {setupListeners} from "@reduxjs/toolkit/query/react";
import {configureStore} from "@reduxjs/toolkit";
import {authApi} from "./auth.service";
import authReducer from "./slice/authSlice";
import {managerApi} from "./manager.service";

export const storeRedux = configureStore({
    reducer: {
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer,
        [managerApi.reducerPath]: managerApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            managerApi.middleware,
        ),
})

setupListeners(storeRedux.dispatch)
