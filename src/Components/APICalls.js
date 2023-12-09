const server = "http://localhost:3001"
// const server = ""

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

// Gets all the tasks params from options
export async function getSpecifictasks(params) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${server}/api/specifictasks?${queryString}`;

        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        });
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
      console.log(params);
  
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
    try {
        const response = await fetch(`${server}/api/deletetask/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            }
        });

        const deletedtask = await response.json();
        console.log('Deleted task:', deletedtask);

    } catch (error) {
        console.error('Error deleting task:', error);
    }
}
// Creates task with params from options
export async function createtask(params) {
    if(params.npat){
        //create npat row
        //also need this whenever npat is updated
        //also whenever something is assigned we need to have npat updated as well
        //npat npat npat
    }
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

