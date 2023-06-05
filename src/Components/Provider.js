import React, { useState } from "react";
import Context from "./Context";

const Provider = ({ children }) => {
  const [poems, setPoems] = useState([]);
  const [searched, setSearched] = useState(true);

  const changePoems = (result) => {
    setPoems(result);
  };

  const changed = () => {
    setSearched(false);
  };

  return (
    <Context.Provider value={{ poems, changePoems, searched, changed }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
