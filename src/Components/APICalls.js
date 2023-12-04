// const server = "http://18.117.181.144:3001"
const server = ""

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

// Gets all the jobs params from options
export async function getSpecificJobs(params) {
    try {
        const queryString = new URLSearchParams(params).toString();
        const url = `${server}/api/specificJobs?${queryString}`;

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
  
// Changes specific property of job with the given job id
export async function updateJob(id, params) {
    try {
      const url = `${server}/api/updateJob/${id}`; // Use the id as a URL parameter
      console.log(params);
  
      const response = await fetch(url, {
        method: 'PUT', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });
  
      const jobChanged = await response.json();
      console.log('Job changed:', jobChanged);
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
        console.error('Error updating job:', error);
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
        console.error('Error updating job:', error);
    }
}
  
// Deletes job with params from options
export async function deleteJob(id) {
    try {
        const response = await fetch(`${server}/api/deleteJob/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            }
        });

        const deletedJob = await response.json();
        console.log('Deleted Job:', deletedJob);

    } catch (error) {
        console.error('Error deleting job:', error);
    }
}
// Creates job with params from options
export async function createJob(params) {
    try {
        const response = await fetch(`${server}/api/createJob`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params), 
        });
        console.log(params)
        const createdJob = await response.json();
        console.log('Created Job:', createdJob);
        return createdJob
    } catch (error) {
        console.error('Error creating job:', error);
    }
}

// Gets a single job by ID
export async function getJobById(id) {
  try {
      const response = await fetch(`${server}/api/getJob/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });

      const job = await response.json();
      return job;
  } catch (error) {
      console.error('Error fetching job:', error);
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
  
        const job = await response.json();
        return job;
    } catch (error) {
        console.error('Error fetching job:', error);
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
      const job = await response.json();
      return job;
  } catch (error) {
      console.error('Error fetching job:', error);
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
        const job = await response.json();
        return job;
    } catch (error) {
        console.error('Error fetching job:', error);
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

        const createdJob = await response.json();
        console.log('Created Job:', createdJob);
    } catch (error) {
        console.error('Error creating job:', error);
    }
}
  
// Get assigned jobs by userID
export async function getJobByUserId(id) {
  try {
      const response = await fetch(`${server}/api/getJobByUserId/${id}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const job = await response.json();
      return job;
  } catch (error) {
      console.error('Error fetching job:', error);
  }
}

