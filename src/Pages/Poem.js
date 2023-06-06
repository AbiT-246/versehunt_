import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Poem.css";
import { useSpeechSynthesis } from "react-speech-kit";

function Poem() {
  const { title } = useParams();
  const [lines, setLines] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false); // State variable to track if speech is playing
  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    const fetchLines = async () => {
      const currUrl = `https://poetrydb.org/title/${title}`;
      try {
        const response = await fetch(currUrl);
        const data = await response.json();
        setLines(data[0].lines);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLines();
  }, []);

  function textToSpeech() {
    var element = document.getElementById("icon1");
    element.classList.toggle("red");
    if (!isPlaying) {
      const poemText = lines.join(" ");
      speak({ text: poemText });
      setIsPlaying(true);
    } else {
      cancel();
      setIsPlaying(false);
    }
  }

  return (
    <div className="Holder">
      <h2>{title}</h2>

      <span id="icon1" onClick={textToSpeech} className="icon1 m-3">
        <i className="fas fa-microphone" style={{ fontSize: "150%" }}></i>
      </span>
      <span className="icon2 m-3">
        <i className="fas fa-language" style={{ fontSize: "150%" }}></i>
      </span>

      {lines.map((line, index) => (
        <p key={index} id="lines">
          {line}
        </p>
      ))}

      {/* <div id="author" className="d-inline-block">
        HELLO
      </div> */}
    </div>
  );
}

export default Poem;
