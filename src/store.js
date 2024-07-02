import { useMemo } from "react";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import WidgetReducer from "./reducer";

export const getStore = ({
  clientId,
  loginUrl,
  supportEmail,
  getUserProfile,
  summit,
  apiBaseUrl,
}) => {
  // to add other reducers later
  const reducers = combineReducers({
    widgetState: WidgetReducer,
  });

  const store = configureStore({
    reducer: persistReducer(
      {
        key: "root",
        storage,
      },
      reducers,
    ),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      thunk: {
        extraArgument: {
          clientId,
          apiBaseUrl,
          summit,
          loginUrl,
          supportEmail,
          getUserProfile,
        },
      },
      immutableCheck: false,
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

  return store;
};

export const useInitStore = (config) => {
  const store = useMemo(() => getStore(config), []);
  const persistor = useMemo(() => persistStore(store), [store]);

  return {
    store,
    persistor,
  };
};
