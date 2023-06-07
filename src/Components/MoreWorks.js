import React, { useContext, useState, useEffect } from "react";
import { List } from "./Display";
import Context from "./Context";

function MoreWorks({ author }) {
  const [works, setWorks] = useState([]);
  const { searched, changed } = useContext(Context);

  useEffect(() => {
    const fetchPoems = async () => {
      const currUrl = `https://poetrydb.org/author/${author}`;
      try {
        const response = await fetch(currUrl);
        const data = await response.json();
        setWorks(data);
        changed(false);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPoems();
  }, [author]);

  console.log(searched);

  if (works.length === 0) {
    return <div className="text-light">Loading...</div>;
  }

  return <List results={works} />;
}

export default MoreWorks;
