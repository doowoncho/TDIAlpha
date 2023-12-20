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

import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import config from './amplifyconfiguration.json';
import { useState } from "react";
import MyNavBar from "./components/MyNavBar";
Amplify.configure(config);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  return (
    <>
    <MyNavBar/>
    <Routes>
      {isAuthenticated ? (
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
  </>
  );
}

export default withAuthenticator(App);

function App({ signOut, user }) {
  return (
    <>
      <h1>Hello {user.username}</h1>
      <button onClick={signOut}>Sign out</button>
    </>
  );
}
