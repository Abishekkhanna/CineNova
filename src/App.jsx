import React, { useEffect, useState } from "react";

const Card = ({ title }) => {
  const [hasLiked, setHasLiked] = useState(false);
  useEffect(() => {
    console.log(`${title} has been liked : ${hasLiked}`);
  }, [hasLiked]);
  return (
    <div className="card">
      <h1>{title}</h1>
      <button
        onClick={() => {
          setHasLiked(!hasLiked);
        }}
      >
        {hasLiked ? "❤️" : "🤍"}
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="card-container">
      <Card title="Ram" />
      <Card title="Raja" />
      <Card title="Ravi" />
    </div>
  );
};

export default App;
