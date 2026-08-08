import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import rootReducer from "./rootReducer";

const storage = {
  getItem: (key: string) => {
    return Promise.resolve(localStorage.getItem(key));
  },
  setItem: (key: string, value: string) => {
    return Promise.resolve(localStorage.setItem(key, value));
  },
  removeItem: (key: string) => {
    return Promise.resolve(localStorage.removeItem(key));
  },
};

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["auth"] // Only persist auth reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }),
});

export const persistor = persistStore(store);
export type AppDispatch = typeof store.dispatch;
export default store;