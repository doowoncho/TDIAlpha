import Table from "../Components/Table";
import { useEffect, useRef, useState  } from "react";
import { getAllJobs, deleteJob, updateJob} from "../Components/APICalls";
import { applySearchFilters, options } from "../Helpers/SearchUtils";
import { CompletedPageColumns } from "../Helpers/TableUtils";

export default function CompletedPage() {
  const [jobList, setJobList] = useState([]);
  const [year, setYear] = useState([2016])
  const [search, setSearch] = useState([]);

  const isMounted = useRef(true);

  async function fetchData() {
    try {
      if (!isMounted.current) return; // Check if component is still mounted
      const data = await getAllJobs();
      if (data == null) return;

      const filteredData = data.filter(job => job.status == 'Completed')

      // Sort by newest
      const sortedData = filteredData.sort((jobA, jobB) => {
        const timeA = jobA.endtime ? new Date(jobA.endtime) : new Date(jobA.starttime);
        const timeB = jobB.endtime ? new Date(jobB.endtime) : new Date(jobB.starttime);
        return timeA - timeB;
      });

      // Jobs filtered by search
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
  });

  return (
      <div>
      <header className='container text-center my-4'>
        <h1>To Be Invoiced</h1>
        <Table
            data={jobList}
            columns={CompletedPageColumns}
            handleUpdate={handleJobUpdate} handleDelete={handleJobDelete} 
          />
      </header>
    </div>
  );
}