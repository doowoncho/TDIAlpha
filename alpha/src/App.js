
import { Route, Routes } from "react-router-dom";
import HomePage from "./Page/HomePage";
import JobsTable from "./Page/JobsTable";
import FormPage from "./Page/FormPage";
import JobDetails from "./Page/JobDetails";
import LoginPage from "./Page/LoginPage";
import TimePage from "./Page/TimePage";
import ToDoPage from "./Page/ToDoPage";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/jobstable" element={<JobsTable />} />
      <Route path="/jobdetails/:id" element={<JobDetails />} />
      <Route path="/todo" element={<ToDoPage />} />
      <Route path="/form" element={<FormPage />} />
      <Route path="/time" element={<TimePage />} />
    </Routes>
  );
}

export default App;