
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Page/HomePage";
import JobsTable from "./Page/JobsTable";
import FormPage from "./Page/FormPage";
import JobDetails from "./Page/JobDetails";
import LoginPage from "./Page/LoginPage";
import TimePage from "./Page/TimePage";
import ToDoPage from "./Page/ToDoPage";
import InvoicePage from "./Page/InvoicePage";
import JobEdit from "./Page/JobEdit";


const App = () => {
  const isUserLoggedIn = window.sessionStorage.getItem("user");

  return (
    <Routes>
      {isUserLoggedIn ? (
        <>
          <Route path="/" element={<JobsTable />} />
          <Route path="/jobstable" element={<JobsTable />} />
          <Route path="/jobdetails/:id" element={<JobDetails />} />
          <Route path="/jobedit/:id" element={<JobEdit />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/invoices" element={<InvoicePage />} />
        </>
      ) : (
        <>
        <Route path="/" element={<LoginPage />} />
        <Route path="/jobstable" element={<LoginPage />} />
        <Route path="/jobdetails/:id" element={<LoginPage />} />
        <Route path="/jobedit/:id" element={<LoginPage />} />
        <Route path="/todo" element={<LoginPage />} />
        <Route path="/form" element={<LoginPage />} />
        <Route path="/time" element={<LoginPage />} /> 
        <Route path="/invoices" element={<LoginPage />} />
        </>
      )}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;