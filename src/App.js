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
import { get } from "aws-amplify/api";
import { fetchAuthSession } from "aws-amplify/auth";

const handleListUsersClick = async () => {
  const token =  await fetchAuthSession()

  console.log(token.tokens.idToken.payload)

  // let apiName = 'AdminQueries';
  // let path = '/listUsers';
  // let options = { 
  //     headers: {
  //       'Content-Type' : 'application/json',
  //       Authorization: `${user.signInUserSession.idToken.jwtToken}`
  //     } 
  // }
  // return get({apiName, path, options});
};

const App = () => {
  return (
    <>
            <button onClick={handleListUsersClick}>create</button>
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
    </Routes>
  </>
  );
}
export default withAuthenticator(App);
