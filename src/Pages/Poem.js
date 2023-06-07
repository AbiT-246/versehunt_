import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Poem.css";
import { useSpeechSynthesis } from "react-speech-kit";
import MoreWorks from "../Components/MoreWorks";
import Provider from "../Components/Provider";

function Poem() {
  const { title } = useParams();
  const [lines, setLines] = useState([]);
  const [author, setAuthor] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); // State variable to track if speech is playing
  const { speak, cancel } = useSpeechSynthesis();

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
    <>
      <div className="Holder mb-3">
        <h2 className="my-2">{title}</h2>

        <span id="icon1" onClick={textToSpeech} className="icon1 m-3">
          <i className="fas fa-microphone" style={{ fontSize: "150%" }}></i>
        </span>
        <span className="icon2 m-3">
          <i className="fas fa-language" style={{ fontSize: "150%" }}></i>
        </span>
        <div className="mt-5 lines container position-absolute">
          {lines.map((line, index) => (
            <p key={index} id="lines">
              {line}
            </p>
          ))}
        </div>
      </div>
      <Provider>
        <MoreWorks author={author} />
      </Provider>
    </>
  );
}

export default Poem;
