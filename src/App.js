import React from "react";
import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <Login />
      <Dashboard />
    </div>
  );
}

export default App;
