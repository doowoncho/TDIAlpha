import Table from "../Components/Table";
import { useEffect, useState  } from "react";
import { getAllJobs, deleteJob, updateJob} from "../Components/APICalls";
import FilterInput from "../Components/FilterInput";
import Select from "react-select";
import { applySearchFilters, options } from "../Helpers/SearchUtils";
import { CompletedPageColumns } from "../Helpers/TableUtils";

export default function CompletedPage() {
  const [jobList, setJobList] = useState([]);
  const [year, setYear] = useState([2016])
  const [search, setSearch] = useState([]);
  const [filters, setFilters] = useState({
    id: false,
    assigned: false,
    contact: false,
    startDate: false,
    endDate: false,
    woNumber: false,
    poNumber: false,
    permitNumber: false,
    requestID: false,
    setup: true,
    company: false
  });

  async function fetchData() {
    try {
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
      const filteredDataWithSearchFilters = applySearchFilters(sortedData, search, filters);
      setJobList(filteredDataWithSearchFilters);

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
  }, [filters]);

  return (
      <div>
      <header className='container text-center my-4'>
        <h1>Completed Jobs - To Be Invoiced</h1>
        <Table
            data={jobList}
            columns={CompletedPageColumns}
            handleUpdate={handleJobUpdate} handleDelete={handleJobDelete} 
          />
      </header>
    </div>
  );
}