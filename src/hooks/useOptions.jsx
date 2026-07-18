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
    console.log(
      "opening options:",
      options,
      "with positions: ",
      event.clientX,
      event.clientY,
    );
    event.stopPropagation();

    let x = event.clientX;
    let y = event.clientY;

    const menuWidth = 180;
    const menuHeight = 150;

    if (window.innerWidth - x < menuWidth) {
      x = x - menuWidth;
    }

    if (window.innerHeight - y < menuHeight) {
      y = y - menuHeight;
    }

    setOptionsState({
      isOpen: true,
      anchorposition: { x, y },
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
