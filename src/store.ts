import { createBrowserHistory } from "history";
import { applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunk from "redux-thunk";
import WWYDListReducer from "./features/WWYDList/WWYDListSlice";
import * as localforage from "localforage";
import { configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistCombineReducers, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "reduxjs-toolkit-persist";

const persistConfig: PersistConfig<any> = {
	key: "root",
	storage: localforage,
};

const persistedReducer = persistCombineReducers(persistConfig, {
	WWYDList: WWYDListReducer,
});

const dev = process.env.NODE_ENV !== "production";

const logger = (createLogger as any)();

let enhancer = dev
	? applyMiddleware(thunk, logger)
	: applyMiddleware(thunk);

const store = configureStore({
	reducer: persistedReducer,
	devTools: dev,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: {
			ignoredActions: [
				FLUSH,
				REHYDRATE,
				PAUSE,
				PERSIST,
				PURGE,
				REGISTER
			]
		}
	}),
	enhancers: [enhancer],
});

const persistor = persistStore(store);

const history = createBrowserHistory();

export { store, persistor, history };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
