import "./App.css";
import React, { useState } from "react";

export default function App() {
  const [gifts, setGifts] = useState([""]);

  let arrGift = gifts.map((gift) => {
    return (
      <li>
        <h3>{gift}</h3>
      </li>
    );
  });
  return (
    <div className="App">
      <h1>Regalos:</h1>
      <ul>{arrGift}</ul>
      <form action="">
        <input type="text" placeholder="gifts" />
        <button>Submit</button>
      </form>
    </div>
  );
}
