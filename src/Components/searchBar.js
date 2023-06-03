import React, { useContext } from "react";
import "./searchBar.css";
import { getValue } from "@testing-library/user-event/dist/utils";
import Context from "./Context";

function SearchBar() {
  const { poems, changePoems } = useContext(Context);

  function updateList(e) {
    const titles = document.querySelectorAll(".title");
    titles.forEach((title) => {
      title.remove();
    });
  }

  async function updateListFinal(e) {
    e.preventDefault();
    var inputValue = document.getElementById("input").value;
    let currUrl = `https://poetrydb.org/title/${inputValue}`;
    try {
      const response = await fetch(currUrl);
      const poems = await response.json();
      changePoems(poems);
    } catch {
      console.log("Error");
    }
  }
  return (
    <navBar className="navbar">
      <form className="form-inline w-100">
        <div className="containerDiv w-100 mx-5 mb-4">
          <input
            id="input"
            className="form-control mr-sm-2 w-75 border-0"
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={updateList}
          ></input>
          <button
            className="px-4 my-sm-0 border-0 float-right"
            type="submit"
            onClick={updateListFinal}
          >
            Search
          </button>
        </div>
      </form>
    </navBar>
  );
}

export default SearchBar;
