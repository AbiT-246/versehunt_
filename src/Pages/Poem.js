import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Poem.css";
import axios from "axios";

function Poem() {
  const { title } = useParams();
  const [lines, setLines] = useState([]);
  const [author, setAuthor] = useState("");
  const [authorInfo, setAuthorInfo] = useState({});

  useEffect(() => {
    const fetchLines = async () => {
      const currUrl = `https://poetrydb.org/title/${title}`;
      try {
        const response = await fetch(currUrl);
        const data = await response.json();
        setLines(data[0].lines);
        setAuthor(data[0].author);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLines();
  }, []);

  // useEffect(() => {
  //   function fetchAuthor() {
  //     const formdata = new FormData();
  //     formdata.append("key", "f1c9e53fc3c5a8ca4fe97b2263f426cb");
  //     formdata.append("txt", "Margaret Hamilton");

  //     const requestOptions = {
  //       method: "POST",
  //       body: formdata,
  //       redirect: "follow",
  //     };

  //     fetch(
  //       "https://api.meaningcloud.com/documentstructure-1.0",
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setAuthorInfo(data);
  //         console.log(data);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }

  //   fetchAuthor();
  // }, []);

  console.log(lines);

  return (
    <div className="Holder">
      <span className="som">
        <i className="fas fa-star fa-2x"></i>
      </span>
      <h2>{title}</h2>
      {lines.map((line) => {
        return <p id="lines">{line}</p>;
      })}
      <div id="author" className="position-absolute d-inline-block">
        HELLO
      </div>
    </div>
  );
}

export default Poem;
