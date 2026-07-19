import { createContext, useContext, useState } from "react";

const OptionsContext = createContext(null);

export const OptionsProvider = ({ children }) => {
  const [optionsState, setOptionsState] = useState({
    isOpen: false,
    anchorposition: { x: 0, y: 0 },
    payload: null,
    options: [],
  });

  const openOptions = (event, payload, options) => {
    event.stopPropagation();
    const rect = event.currentTarget?.getBoundingClientRect?.() ?? {
      top: event.clientY,
      bottom: event.clientY,
      left: event.clientX,
      right: event.clientX,
    };

    setOptionsState({
      isOpen: true,
      anchorposition: rect,
      payload,
      options,
    });
  };
  const closeOptions = () => {
    setOptionsState((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const setDocPayload = (payload) => {
    setOptionsState((prev) => ({ ...prev, payload }));
  };

  return (
    <OptionsContext.Provider
      value={{ ...optionsState, openOptions, closeOptions, setDocPayload }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptions = () => {
  const context = useContext(OptionsContext);
  if (!context)
    throw new Error("useOptions must be used within OptionsProvider");
  return context;
};
