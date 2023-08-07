
import { Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import TestPage from "./Page/TestPage";
import JobsTable from "./Page/JobsTable";
import NewRequests from "./Page/NewRequests"
import DeclinedTable from "./Page/DeclinedTable";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/test" element={<TestPage />} />
      <Route path="/jobstable" element={<JobsTable />} />
      <Route path="/newtable" element={<NewRequests />} />
      <Route path="/declinedtable" element={<DeclinedTable />} />
    </Routes>
  );
}

export default App;