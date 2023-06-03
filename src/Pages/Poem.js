import React from "react";
import { useParams } from "react-router-dom";

const Poem = () => {
  const title = { useParams };

  return <div>{title}</div>;
};

export default Poem;
