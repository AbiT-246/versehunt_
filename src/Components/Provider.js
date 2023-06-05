import React, { useState } from "react";
import Context from "./Context";

const Provider = ({ children }) => {
  const [poems, setPoems] = useState([]);
  const [searched, setSearched] = useState(false);

  const changePoems = (result) => {
    setPoems(result);
  };

  return (
    <Context.Provider value={{ poems, changePoems }}>
      {children}
    </Context.Provider>
  );
};

export default Provider;
