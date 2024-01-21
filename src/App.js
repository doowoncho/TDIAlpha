
import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./Page/HomePage";
import TasksTablePage from "./Page/TasksTablePage";
import FormPage from "./Page/FormPage";
import TaskDetails from "./Page/TaskDetails";
import LoginPage from "./Page/LoginPage";
import TimePage from "./Page/TimePage";
import ToDoPage from "./Page/ToDoPage";
import InvoicePage from "./Page/InvoicePage";
import CompletedPage from "./Page/CompletedPage";
import JobsTable from "./Page/JobsTablePage";
import Receipts from "./Page/ReceiptsPage";


const App = () => {
  const isUserLoggedIn = window.sessionStorage.getItem("user");

  return (
    <Routes>
      {isUserLoggedIn ? (
        <>
          <Route path="/" element={<JobsTable />} />
          <Route path="/taskspage/:id" element={<TasksTablePage />} />
          <Route path="/taskdetails/:id" element={<TaskDetails />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/invoices" element={<InvoicePage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/jobstable" element={<JobsTable />} />
          <Route path="/receipts" element={<Receipts />} />
        </>
      ) : (
        <>
        <Route path="/" element={<LoginPage />} />
        <Route path="/taskspage/:id" element={<LoginPage />} />
        <Route path="/taskdetails/:id" element={<LoginPage />} />
        <Route path="/todo" element={<LoginPage />} />
        <Route path="/form" element={<LoginPage />} />
        <Route path="/time" element={<LoginPage />} /> 
        <Route path="/invoices" element={<LoginPage />} />
        <Route path="/completed" element={<LoginPage />} />
        <Route path="/jobstable" element={<LoginPage />} />
        </>
      )}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;