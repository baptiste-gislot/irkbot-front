import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import axios from "axios";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      axios
        .get("http://127.0.0.1:8000/login", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res, err) => {
          if (err) console.log(err);
          if (res.data === true) {
            setIsLogged(true);
          }
        });
    } else {
    }
  }, []);

  return (
    <div className="App">
      {isLogged ? <Dashboard /> : <Login isLogged={setIsLogged} />}
    </div>
  );
}

export default App;
