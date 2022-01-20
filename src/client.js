import io from "socket.io-client";
import React from "react";
import ReactDOM from "react-dom";
import "./app.scss";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { useEffect, useState } from "react";
import DisplayPlots from "./components/DisplayPlots";
import Header from "./components/Header";

const socket = io("http://localhost:3000", {
  transports: ["websocket", "polling"],
});

const App = ({}) => {
  const [data, setData] = useState([]);
  const [entry, setEntry] = useState();

  const handleSubmit = () => {
    console.log(entry);
    socket.send("hello");
  };

  // 1. listen for a cpu event and update the state
  useEffect(() => {
    socket.on("myData", (comingData) => {
      setData(comingData);
    });
  }, []);

  // Render Data
  return (
    <div className='app'>
      <Header entry={entry} setEntry={setEntry} handleSubmit={handleSubmit} />
      <DisplayPlots data={data} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
