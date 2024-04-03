import Table from "../Components/Table";
import { useEffect, useRef, useState  } from "react";
import { getAllJobs, deleteJob, updateJob} from "../Components/APICalls";
import { InvoicePageColumns } from "../Helpers/TableUtils";

export default function InvoicePage() {
  const [jobList, setJobList] = useState([]);
  const [search, setSearch] = useState([]);
  const isMounted = useRef(true);

  async function fetchData() {
    try {
      if (!isMounted.current) return; // Check if component is still mounted
      const data = await getAllJobs();
      if (data == null) return;

      const filteredData = data.filter(job => job.status == 'Invoice')

      // Sort by newest
      const sortedData = filteredData.sort((jobA, jobB) => {
        const timeA = jobA.endtime ? new Date(jobA.endtime) : new Date(jobA.starttime);
        const timeB = jobB.endtime ? new Date(jobB.endtime) : new Date(jobB.starttime);
        return timeA - timeB;
      });

      setJobList(sortedData);

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

  useEffect(() => {
    fetchData();

    return () => {
      isMounted.current = false;
    }
  }, []);


  return (
      <div>
      <header className='container text-center my-4'>
        <h1>Invoice Page</h1>
        <Table
            data={jobList}
            columns={InvoicePageColumns}
            handleUpdate={handleJobUpdate} handleDelete={handleJobDelete} 
          />
      </header>
    </div>
  );
}