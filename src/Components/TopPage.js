import SearchBar from "./searchBar";
import "./TopPage.css";

function TopPage() {
  return (
    <div
      id="top"
      className="container tempClass border border-dark border-bottom-0"
    >
      <h1 className="title mx-5 mt-5 font-weight-bold">Welcome.</h1>
      <h3 className="title mx-5 mb-5 font-weight-bold">
        The world of poetry...right at your fingertips.
      </h3>
      <SearchBar />
    </div>
  );
}

export default TopPage;
