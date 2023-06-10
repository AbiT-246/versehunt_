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
  const [isPlaying, setIsPlaying] = useState(false);
  const { speak, cancel } = useSpeechSynthesis();

  useEffect(() => {
    const fetchLines = async () => {
      const currUrl = `https://poetrydb.org/title/${title}`;
      try {
        const response = await fetch(currUrl);
        const data = await response.json();
        setLines(data[0].lines);
        setAuthor(data[0].author);
        window.scrollTo(0, -10000);
        if (title.length > 24) {
          var element = document.getElementById("title");
          element.classList.add("sizeChange");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLines();
  }, [title]);

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
        <h2 id="title" className="my-2">
          {title}
        </h2>
        <h6 className="nameDisp">{author}</h6>
        <span id="icon1" onClick={textToSpeech} className="icon1">
          <i className="fas fa-microphone" style={{ fontSize: "150%" }}></i>
        </span>
        <span className="icon2">
          <i className="fas fa-language" style={{ fontSize: "150%" }}></i>
        </span>
        <span className="moreBy px-3 rounded">
          <a className="toBottom" href="#Reference">
            More by {author}
          </a>
        </span>
        <div className="mt-5 lines container position-absolute">
          {lines.map((line, index) => (
            <p key={index} id="lines">
              {line}
            </p>
          ))}
        </div>
        <div className="position-relative"></div>
      </div>
      <div id="moreWorks" className="position-relative">
        <h3 id="Reference" className="position-relative ml-5 mt-5">
          More by {author}...
        </h3>
        <div id="theMore" className="position-relative">
          <Provider>
            <MoreWorks author={author} />
          </Provider>
        </div>
      </div>
    </>
  );
}

export default Poem;
