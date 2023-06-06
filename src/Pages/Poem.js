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

  useEffect(() => {
    async function fetchAuthor() {
      const url =
        "https://microsoft-translator-text.p.rapidapi.com/BreakSentence?api-version=3.0";
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "b4571786b7msh86aef6cc5045cfep135fcdjsn642da6f9ec96",
          "X-RapidAPI-Host": "microsoft-translator-text.p.rapidapi.com",
        },
        body: [
          {
            Text: "How are you? I am fine. What did you do today?",
          },
        ],
      };

      try {
        const response = await fetch(url, options);
        const result = await response.text();
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }

    fetchAuthor();
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

      {/* <div id="author" className="position-absolute d-inline-block">
        HELLO
      </div> */}
    </div>
  );
}

export default Poem;
