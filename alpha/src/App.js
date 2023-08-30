
import { Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import JobsTable from "./Page/JobsTable";
import FormPage from "./Page/FormPage";
import JobDetails from "./Page/JobDetails";
import LoginPage from "./Page/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/jobstable" element={<JobsTable />} />
      <Route path="/jobdetails/:id" element={<JobDetails />} />
      <Route path="/form" element={<FormPage />} />
    </Routes>
  );
}

export default App;