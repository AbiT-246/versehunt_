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

  useEffect(() => {
    const fetchAuthor = async () => {
      const axios = require("axios");

      const options = {
        method: "GET",
        url: "https://search-celebrity-biography.p.rapidapi.com/search/jimmy%20fallon",
        headers: {
          "X-RapidAPI-Key":
            "b4571786b7msh86aef6cc5045cfep135fcdjsn642da6f9ec96",
          "X-RapidAPI-Host": "search-celebrity-biography.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response);
        setAuthorInfo(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchAuthor();
  }, [author]);

  console.log(lines);
  console.log(authorInfo);

  return (
    <div className="Holder">
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
