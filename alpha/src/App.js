
import { Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import JobsTable from "./Page/JobsTable";
import FormPage from "./Page/FormPage";
import JobDetails from "./Page/JobDetails";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/jobstable" element={<JobsTable />} />
      <Route path="/jobdetails/:id" element={<JobDetails />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
}

export default App;