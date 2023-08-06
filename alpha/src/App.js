
import { Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import TestPage from "./Page/TestPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  );
}

export default App;