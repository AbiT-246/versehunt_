import React, { useEffect, useState, useContext } from "react";
import "./Display.css";
import Temp from "../Utilities/Thumbnail.jpg";
import Context from "./Context";
import { NavLink } from "react-router-dom";

export const List = ({ results }) => {
  const { searched, changed } = useContext(Context);

  return (
    <div className="container">
      <div className="row justify-content-center">
        {results.map((poem) => (
          <div className="specBox col-3 m-1">
            <NavLink to={`/Poem/${poem.title}`}>
              {searched && (
                <span className="star-icon">
                  <i className="fas fa-star fa-2x"></i>
                </span>
              )}
              <img className="w-100" src={Temp} />
              <h6
                className="mt-2 text-center"
                style={{
                  fontfamily: "unset",
                  fontWeight: "bolder",
                  color: "#a3a399",
                }}
              >
                {poem.title}
              </h6>
              <p style={{ color: "#a3a399" }} className="text-center">
                {poem.author}
              </p>
            </NavLink>
          </div>
        ))}
      </div>
    </div>
  );
};

function Display() {
  const { poems, changePoems } = useContext(Context);

  useEffect(() => {
    const urls = [
      "https://poetrydb.org/title/Ozymandias",
      "https://poetrydb.org/title/the%20tyger",
      "https://poetrydb.org/title/howl",
      "https://poetrydb.org/title/sonnet%2043",
    ];
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const poem = await response.json();
        changePoems((prevPoems) => [...prevPoems, poem[0]]);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchPoems = async () => {
      const promises = urls.map((url) => fetchData(url));
      await Promise.all(promises);
    };

    fetchPoems();
  }, []);
  console.log(poems);
  return <List results={poems} />;
}

export default Display;
