const server = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_PROD_SERVER
  : process.env.REACT_APP_LOCAL_SERVER;

// Gets a list of all the tasks
export async function getAlltasks() {
    try {
      const response = await fetch(`${server}/api/tasks`);
      const data = await response.json();
      return(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // Gets a list of all the jobs
export async function getAllJobs() {
    try {
      const response = await fetch(`${server}/api/jobs`);
      const data = await response.json();
      return(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

//Gets a list of all the contacts
export async function getAllContacts() {
    try {
      const response = await fetch(`${server}/api/contacts`);
      const data = await response.json();
      return(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
// Changes specific property of task with the given task id
export async function updatetask(id, params) {
    try {
      const url = `${server}/api/updatetask/${id}`; // Use the id as a URL parameter
  
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
  
      const taskChanged = await response.json();
      console.log('task changed:', taskChanged);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }

  // Changes specific property of job with the given task id
export async function updateJob(id, params) {
    try {
      const url = `${server}/api/updatejob/${id}`; // Use the id as a URL parameter
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
  
      const jobChanged = await response.json();
      console.log('job changed:', jobChanged);
    } catch (error) {
      console.error('Error updating job:', error);
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

  // Uploads into the photo table
  export async function uploadPhoto(params) {
    try {
        const url =`${server}/api/uploadPhoto/`;
        const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(params),
        });

        const fileUpdate = await response.json();
        console.log('Photo uploaded:', fileUpdate);
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

  // Uploads into the permit confirmations table
  export async function uploadPermitCon(params) {
    try {
        const url =`${server}/api/uploadPermitCon/`;
        const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(params),
        });

        const fileUpdate = await response.json();
        console.log('Permit Con uploaded:', fileUpdate);
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

  // Uploads into the permits table
  export async function uploadPermit(params) {
    try {
        const url =`${server}/api/uploadPermit/`;
        const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(params),
        });

        const fileUpdate = await response.json();
        console.log('Permit Con uploaded:', fileUpdate);
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

  // Uploads into the permits table
  export async function uploadPlan(params) {
    try {
        const url =`${server}/api/uploadPlan/`;
        const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(params),
        });

        const fileUpdate = await response.json();
        console.log('Permit Con uploaded:', fileUpdate);
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

  // Uploads into the permits table
  export async function uploadReceipts(params) {
    try {
        const url =`${server}/api/uploadReceipts/`;
        const response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify(params),
        });

        const fileUpdate = await response.json();
    } catch (error) {
        console.error('Error updating task:', error);
    }
}

export async function deleteFile(name) {
    try {

        await fetch(`${server}/api/deleteFile`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ name: name.filename }),
        });
    } catch (error) {
        console.error('Error deleting job:', error);
    }
}

export async function deleteReceipts(name) {
    try {

        await fetch(`${server}/api/deleteReceipts`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({ name: name.filename }),
        });
    } catch (error) {
        console.error('Error deleting job:', error);
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
    try {
        const response = await fetch(`${server}/api/deletetask/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            console.log(`Task with ID ${id} deleted successfully`);
            // Optionally, you can return true or some indication of success
            return true;
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
}

// Deletes job with params from options
export async function deleteJob(id) {
    try {
        const response = await fetch(`${server}/api/deletejob/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            }
        });
    } catch (error) {
        console.error('Error deleting job:', error);
    }
}
// Creates task with params from options
export async function createtask(params) {
    try {
        const response = await fetch(`${server}/api/createtask`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), 
        });
        const createdtask = await response.json();
        console.log('Created task:', createdtask);
        return createdtask
    } catch (error) {
        console.error('Error creating task:', error);
    }
}

// Creates Job
export async function createJob() {
    try {
        const response = await fetch(`${server}/api/createJob`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(), 
        });
        const createdjob = await response.json();
        console.log('Created Job:', createdjob);
        return createdjob
    } catch (error) {
        console.error('Error creating job:', error);
    }
}

export async function createContact(params) {
    try {
        const response = await fetch(`${server}/api/createContact`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), 
        });
        const createdcontact = await response.json();
        console.log('Created Contact:', createdcontact);
        return createdcontact
    } catch (error) {
        console.error('Error creating job:', error);
    }
}

// Gets a single job by ID
export async function getJobById(id) {
    try {
        const response = await fetch(`${server}/api/getjob/${id}`, {
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

// Gets a single task by ID
export async function gettaskById(id) {
  try {
      const response = await fetch(`${server}/api/gettask/${id}`, {
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

// Gets a single task by ID
export async function getTasksByJobId(id) {
    try {
        const response = await fetch(`${server}/api/gettasksbyjobid/${id}`, {
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

export async function getReceipts() {
    try {
      const response = await fetch(`${server}/api/getReceipts`);
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

export async function createPermitCostLog(params) {
    try {
        const response = await fetch(`${server}/api/createPermitCostLog`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), 
        });

        const createdlog = await response.json();
        console.log('Created Log:', createdlog);
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

export async function getPermitCostLogsByJobId(id) {
    try {
        const response = await fetch(`${server}/api/getpermitcostlogsbyjobid/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const permitCosts = await response.json();
        return permitCosts;
    } catch (error) {
        console.error('Error fetching task:', error);
    }
}
