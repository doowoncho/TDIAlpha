import Table from "../Components/Table";
import { useEffect, useState  } from "react";
import { getAllJobs, deleteJob, updateJob} from "../Components/APICalls";
import FilterInput from "../Components/FilterInput";

export default function CompletedPage() {
  const [jobList, setJobList] = useState([]);
  const [year, setYear] = useState([2016])
  const [filterSettings, setFilterSettings] = useState({
    id: "",
    assigned: "",
    customer: "",
    startDate: "",
    endDate: "",
    woNumber: "",
    poNumber: "",
    permitNumber: "",
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
      const filteredDataWithSearchFilters = applySearchFilters(sortedData, filterSettings);
      setJobList(filteredDataWithSearchFilters);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const applySearchFilters = (data, filters) => {
    return data.filter((job) => {
      const isIdMatch = filters.id === "" || job.id.toString().indexOf(filters.id) !== -1;
      const isCustomerMatch = filters.customer === "" || job.customer.toLowerCase().indexOf(filters.customer.toLowerCase()) !== -1;
      const isStartDateMatch = filters.startDate === "" || new Date(job.starttime) >= new Date(filters.startDate);
      const isEndDateMatch = filters.endDate === "" || new Date(job.endtime) <= new Date(filters.endDate);
      const isWoMatch = filters.woNumber === "" || job.wo_number.toString().indexOf(filters.woNumber) !== -1;
      const isPoMatch = filters.poNumber === "" || job.po_number.toString().indexOf(filters.poNumber) !== -1;
      const isPermitNumberMatch = filters.permitNumber === "" || job.permit_number.toString().indexOf(filters.permitNumber) !== -1;
      return isIdMatch && isCustomerMatch && isStartDateMatch && isEndDateMatch && isWoMatch && isPoMatch && isPermitNumberMatch;
    });
  };

  const handleJobUpdate = async (id, params) => {
    await updateJob(id, params);
    fetchData()
  };

  const handleJobDelete = async id => {
    await deleteJob(id);
    fetchData()
  };

  const handleFilterChange = (param, value) => {
    setFilterSettings((prevSettings) => ({
      ...prevSettings,
      [param]: value
    }));
  };

  useEffect(() => {
    fetchData();
  }, [filterSettings]);

  return (
      <div>
      <header className='container text-center my-4'>
        <h1>Complete Jobs - To Be Invoiced</h1>
        <div className="d-flex justify-content-center flex-wrap my-3">
          <FilterInput label="ID" value={filterSettings.id} onChange={(value) => handleFilterChange('id', value)} />
            
          <FilterInput label="WO#" value={filterSettings.woNumber} onChange={(value) => handleFilterChange('woNumber', value)} />
          <FilterInput label="Customer" value={filterSettings.customer} onChange={(value) => handleFilterChange('customer', value)} />
          <FilterInput label="Permit Number" value={filterSettings.permitNumber} onChange={(value) => handleFilterChange('permitNumber', value)} />
          <FilterInput label="PO number" value={filterSettings.poNumber} onChange={(value) => handleFilterChange('poNumber', value)} />
        </div>
        <Table
            data={jobList}
            displayColumns={["ID", "StartTime", "EndTime", "Status", "Setup", "Customer", "Permit_number", "Notes", "WO_number", "PO_number"]}
            handleUpdate={handleJobUpdate} handleDelete={handleJobDelete} 
          />
      </header>
    </div>
  );
}