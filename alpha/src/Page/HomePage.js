

async function getJobs() {
  try {
    const response = await fetch('http://localhost:3001/api/jobs');
    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function getSpecificJobs(customer) {
  try {
    const response = await fetch(`http://localhost:3001/api/specificJobs/${encodeURIComponent(customer)}`);
    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

async function deleteJob(jobId) {
  try {
    const response = await fetch(`http://localhost:3001/api/jobs-delete/${encodeURIComponent(jobId)}`, {
      method: 'DELETE',
    });

    if (response.status === 404) {
      // Handle the case when the job with the given ID doesn't exist
      console.log('Job not found');
    } else if (response.ok) {
      // The job was successfully deleted
      console.log('Job deleted');
    } else {
      // Handle other errors
      console.error('Error deleting job');
    }
  } catch (error) {
    console.error('Error deleting job:', error);
  }
}


async function createJob(customer, date, status, setup, permit_number, wo_number, po_number) {
  try {
    const response = await fetch(`http://localhost:3001/api/create-job/${encodeURIComponent(customer)}`, {
      method: 'POST',
    });

    const createdJob = await response.json();
    console.log('Created Job:', createdJob);
  } catch (error) {
    console.error('Error creating job:', error);
  }
}

export default function HomePage() {
  return (
    <div>
      <header className='container text-center my-4'>
        <h1>Welcome</h1>
        <button onClick={()=>createJob('brother', '1 street')}>Add Job</button>
        <button onClick={()=>getJobs()}>Get Jobs</button>
        <button onClick={()=>deleteJob(1)}>Delete Job</button>
        <button onClick={()=>getSpecificJobs('doowon')}>specific Job</button>
      </header>
    </div>
  );
}