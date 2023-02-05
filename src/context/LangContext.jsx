import React, { createContext } from "react";

export const LangContext = createContext();

export default function LangProvider({ children }) {
  return (
    <LangContext.Provider>
      {children}
    </LangContext.Provider>
  );
}