import React from "react";
import "./searchBar.css";
import { getValue } from "@testing-library/user-event/dist/utils";

function SearchBar() {
  function updateList(e) {
    //setstate
    const box = document.getElementById("top");
    const title = document.getElementsByClassName("title");
    const titles = document.querySelectorAll(".title");
    titles.forEach((title) => {
      title.remove();
    });
  }

  function updateListFinal() {
    var inputValue = document.getElementById("input").value;
    //setstate
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
