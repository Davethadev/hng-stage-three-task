import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Gallery from "./pages/Gallery";

const App = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/"></Route>
      <Route element={<Gallery />} path="/gallery"></Route>
    </Routes>
  );
};

export default App;
