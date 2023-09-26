import Table from "../Components/Table";
import { useEffect, useState  } from "react";
import { getAllJobs, getSpecificJobs, updateJob, deleteJob} from "../Components/APICalls";

export default function InvoicePage() {
  const [jobList, setJobList] = useState([]);

  async function fetchData() {
    try {
      const data = await getAllJobs();
      if (data == null) return;
      
      setJobList(data.filter(job => job.status === "Invoice"));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleJobUpdate = async (id, params) => {
    await updateJob(id, params);
    fetchData()
  };

  const handleJobDelete = async id => {
    await deleteJob(id);
    fetchData()
  };


  useEffect(() => {fetchData()});

  return (
      <div>
      <header className='container text-center my-4'>
        <h1>Invoice Page</h1>
        <Table
            data={jobList}
            displayColumns={["ID", "StartDate", "EndDate", "Status", "Setup", "Customer", "Permit_number", "Notes", "WO_number", "PO_number"]}
            handleJobUpdate={handleJobUpdate} handleJobDelete={handleJobDelete} 
          />
      </header>
    </div>
  );
}