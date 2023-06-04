import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Poem.css";

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
      if (author !== "") {
        const proxyUrl = "https://cors-anywhere.herokuapp.com/";
        const apiUrl = `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro=true&titles=${author}`;

        try {
          const response = await fetch(proxyUrl + apiUrl);
          const result = await response.json();
          setAuthorInfo(result);
        } catch (error) {
          console.error("Error:", error);
        }
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
