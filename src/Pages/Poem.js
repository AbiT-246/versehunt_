import React from "react";
import { useParams } from "react-router-dom";

const Poem = () => {
  const { title } = { useParams };

  console.log(title);
  return <div>{title}</div>;
};

export default Poem;
