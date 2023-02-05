import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux-features/store";

function AppContext({ children }) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}

export default AppContext;