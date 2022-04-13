import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import { Route, Routes } from "react-router";
import Home from "./Components/Home/Home";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Fragment>
  );
}

export default App;
