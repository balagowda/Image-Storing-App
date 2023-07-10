import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Upload from "./components/Home/Upload";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </>
  );
};

export default App;
