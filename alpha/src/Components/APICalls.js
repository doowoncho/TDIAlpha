// Gets a list of all the jobs
export async function getAllJobs() {
    try {
      const response = await fetch('http://localhost:3001/api/jobs');
      const data = await response.json();
      return(data)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
// Gets all the jobs params from options
export async function getSpecificJobs(options) {
    try {
        const queryString = new URLSearchParams(options).toString();
        const url = `http://localhost:3001/api/specificJobs?${queryString}`;

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
  
// Deletes job with params from options
export async function deleteJob(options) {
    try {
        const response = await fetch('http://localhost:3001/api/jobs-delete', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify(options), 
        });

        const deletedJob = await response.json();
        console.log('Deleted Job:', deletedJob);

    } catch (error) {
        console.error('Error deleting job:', error);
    }
}
// Creates job with params from options
export async function createJob(options) {
    try {
        const response = await fetch('http://localhost:3001/api/create-job', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(options), 
        });

        const createdJob = await response.json();
        console.log('Created Job:', createdJob);
    } catch (error) {
        console.error('Error creating job:', error);
    }
}
  