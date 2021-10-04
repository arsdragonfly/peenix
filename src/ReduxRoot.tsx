import { Typography } from "@mui/material";
import { Provider } from "react-redux";
import { PersistGate } from "reduxjs-toolkit-persist/integration/react";
import App from "./App";
import { store, persistor } from "./store";

export const ReduxRoot: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<Typography>Loading...</Typography>}
        persistor={persistor}
      >
        <App />
      </PersistGate>
    </Provider>
  );
};
