import React from "react";
import TopPage from "../Components/TopPage";
import Display from "../Components/Display";
import Provider from "../Components/Provider";

const Homepage = () => {
  return (
    <Provider>
      <TopPage />
      <Display />
    </Provider>
  );
};

export default Homepage;
