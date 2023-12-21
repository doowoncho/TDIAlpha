import { generateClient } from 'aws-amplify/api';
import * as queries from '../graphql/queries';
import * as mutations from '../graphql/mutations';

const client = generateClient();
const server = ""

  // Gets a list of all the jobs
  export async function getAllTasks() {
    try {
      const response = await client.graphql({ query: queries.listTasks});
      const data = await response.data;
      return(data.listTasks.items)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Gets a list of all the jobs
export async function getAllJobs() {
    try {
      const response = await client.graphql({ query: queries.listJobs});
      const data = await response.data;
      return(data.listJobs.items)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  
// Changes specific property of task with the given task id
export async function updatetask(id, params) {
    const taskVals = { ...params, id: id };
    const newTask = await client.graphql({
      query: mutations.updateTasks,
      variables: { input: taskVals }
    }); 

    const job = await client.graphql({ 
      query: queries.getTasks,
      variables: {input: { id: taskVals.job_id } }
    });

    if (job) {
      const response = await client.graphql({ query: queries.listTasks});
      const data = await response.data;
      let tasks = data.listTasks.items

      const earliestTask = [...tasks].filter(task => task.starttime !== null).sort((a, b) => new Date(a.starttime) - new Date(b.starttime))[0];
      const latestTask = [...tasks].filter(task => task.endtime !== null).sort((a, b) => new Date(a.endtime) - new Date(b.endtime))[-1];
    
      if (earliestTask < job.starttime || latestTask > job.endtime) {
        await client.graphql({
          query: mutations.updateJobs,
          variables: {input: {
            starttime: earliestTask.starttime,
            endtime: latestTask.endtime,
            id: taskVals.job_id
          }},
        });
      }
    }

  }

  // Changes specific property of task with the given task id
export async function updateJob(id, params) {
  const jobVals = { ...params, id: id };
  try{

    const newJob = await client.graphql({
      query: mutations.updateJobs,
      variables: { 
        input: jobVals
      }
    });
  }
    catch (error){
      console.error("error updating Job", error)
    }
  }

  // Uploads into the file table
  export async function uploadFile(params) {
    try {
        const url =`${server}/api/uploadfile/`;
        const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(params),
        });

        const fileUpdate = await response.json();
        console.log('File uploaded:', fileUpdate);
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

export async function files(id, params) {
    try {
        const url = `${server}/api/file/${id}`; // Use the id as a URL parameter

        console.log(params);
        const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(params),
        });

        const fileUpdate = await response.json();
        console.log('File updated:', fileUpdate);
    } catch (error) {
        console.error('Error updating task:', error);
    }
}
  
// Deletes task with params from options
export async function deletetask(id) {
  const deleteTask = await client.graphql({
    query: mutations.deleteTasks,
    variables: { input: {id:id} }
  });
}

// Deletes task with params from options
export async function deleteJob(id) {
  const deleteJob = await client.graphql({
    query: mutations.deleteJobs,
    variables: { input: {id:id} }
  });
}
// Creates task with params from options
export async function createtask(params) {
  console.log(params)
  try{
    const newTask = await client.graphql({
      query: mutations.createTasks,
      variables: {input: params}
    });
  }catch (error){
    console.error('Error creating task:', error);
  }
  
}

// Creates Job
export async function createJob() {
  try{
  const newJob = await client.graphql({
    query: mutations.createJobs,
    variables: {input: {email: ''}}
  });
  return newJob
  }catch (error){
    console.error('Error creating job:', error);
  }
  
}

// Gets a single task by ID
export async function getJobById(id) {
  
  try{
    const response = await client.graphql({ 
      query: queries.listJobs,
      variables: {input:{id: id}}
    });
    
    return response.data.listJobs.items[0]
  }
  catch (error){
    console.error("getjobbyid", error)
  }
  
}

// Gets a single task by ID
export async function gettaskById(id) {

  const response = await client.graphql({ 
    query: queries.listTasks,
    variables: {input:{id: id}}
  });

  return response.data.listTasks.items[0]
}

// Gets a single task by ID
export async function getTasksByJobId(id) {
    try {
        const response = await client.graphql({ 
          query: queries.listTasks,
          variables: {input:{job_id: id}}
        });
        return response.data.listTasks.items
    } catch (error) {
        console.error('Error fetching tasks by job id:', error);
    }
  }

export async function getFilesById(id) {
    try {
        const response = await fetch(`${server}/api/getFiles/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
  
        const task = await response.json();
        return task;
    } catch (error) {
        console.error('Error fetching task:', error);
    }
  }

// Gets a single user by ID
export async function getUserById(id) {
  try {
      const response = await fetch(`${server}/api/getUser/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const task = await response.json();
      return task;
  } catch (error) {
      console.error('Error fetching task:', error);
  }
}

// Gets a list of all the users
export async function getAllUsers() {
    try {
      const response = await fetch(`${server}/api/users`);
      const data = await response.json();
      return(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  export async function getUserByEmail(email) {
    try {
        const response = await fetch(`${server}/api/getUserByEmail/${email}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const task = await response.json();
        return task;
    } catch (error) {
        console.error('Error fetching task:', error);
    }
  }
  export async function createUser(params) {
    try {
        const response = await fetch(`${server}/api/createUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), 
        });

        const createdtask = await response.json();
        console.log('Created task:', createdtask);
    } catch (error) {
        console.error('Error creating task:', error);
    }
}
  
// Get assigned tasks by userID
export async function gettaskByUserId(id) {
  try {
      const response = await fetch(`${server}/api/gettaskByUserId/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const task = await response.json();
      return task;
  } catch (error) {
      console.error('Error fetching task:', error);
  }
}