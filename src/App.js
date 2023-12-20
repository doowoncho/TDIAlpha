import { Route, Routes, Navigate } from "react-router-dom";
import TasksTablePage from "./Page/TasksTablePage";
import FormPage from "./Page/FormPage";
import TaskDetails from "./Page/TaskDetails";
import TimePage from "./Page/TimePage";
import ToDoPage from "./Page/ToDoPage";
import InvoicePage from "./Page/InvoicePage";
import CompletedPage from "./Page/CompletedPage";
import JobsTable from "./Page/JobsTablePage";
import { withAuthenticator } from '@aws-amplify/ui-react';

const App = () => {
  return (
    <>
    <Routes>
          <Route path="/" element={<JobsTable />} />
          <Route path="/taskspage/:id" element={<TasksTablePage />} />
          <Route path="/taskdetails/:id" element={<TaskDetails />} />
          <Route path="/todo" element={<ToDoPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/time" element={<TimePage />} />
          <Route path="/invoices" element={<InvoicePage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/jobstable" element={<JobsTable />} />
      {/* <Route path="/login" element={<LoginPage />} /> */}
    </Routes>
  </>
  );
}

export default withAuthenticator(App);;
