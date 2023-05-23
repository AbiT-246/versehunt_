import React, { useEffect, useState } from "react";
import "./Display.css";
import Ozymandias from "../Utilities/Ozymandias.jpg";
import TheTyger from "../Utilities/TheTyger.jpg";
import Howl from "../Utilities/Howl.jpg";
import Sonnet from "../Utilities/Sonnet43.jpg";
import Temp from "../Utilities/debby-hudson-DR31squbFoA-unsplash.jpg";

function Display() {
  const [poems, setPoems] = useState([]);

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
        setPoems((prevPoems) => [...prevPoems, poem]);
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

  return (
    <div className="container">
      <div className="row">
        {poems.map((poem) => (
          <div className="specBox col-sm m-1">
            <span className="star-icon">
              <i className="fas fa-star fa-2x"></i>
            </span>
            <img className="w-100" src={Temp} />
            <h6
              className="mt-2 text-center"
              style={{ fontfamily: "unset", fontWeight: "bolder" }}
            >
              {poem[0].title}
            </h6>
            <p style={{ color: "#000000a3" }} className="text-center">
              {poem[0].author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Display;
