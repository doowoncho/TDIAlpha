import Table from "../Components/Table";
import { useEffect, useState  } from "react";
import { getAlltasks, getSpecifictasks, updatetask, deletetask, getAllJobs, deleteJob, updateJob} from "../Components/APICalls";
import FilterInput from "../Components/FilterInput";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function InvoicePage() {
  const [jobList, setJobList] = useState([]);
  const [services, setServices] = useState([]);
  const [filterSettings, setFilterSettings] = useState({
    id: "",
    assigned: "",
    customer: "",
    startDate: "",
    endDate: "",
    woNumber: "",
    poNumber: "",
    permitNumber: "",
    requestID: ""
  });

  async function fetchData() {
    try {
      const data = await getAllJobs();
      if (data == null) return;

      const filteredData = data.filter(job => job.status == 'Invoice')

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

  useEffect(() => {
    // Fetch your data from an API or perform any async operation
    const fetchData = async () => {
      // Simulating API response
      const data = [
        { id: 1, name: 'Service 1' },
        { id: 2, name: 'Service 2' },
        { id: 3, name: 'Service 3' },
        { id: 4, name: 'More Services' },
      ];

      // Set the fetched data to the state
      setServices(data);
    };

    // Call the fetchData function
    fetchData();
  }, []);

  const handleJobUpdate = async (id, params) => {
    await updateJob(id, params);
    fetchData()
  };

  const handleJobDelete = async id => {
    await deleteJob(id);
    fetchData()
  };

  const applySearchFilters = (data, filters) => {
    return data.filter((job) => {
      const isIdMatch = filters.id === "" || job.id.toString().indexOf(filters.id) !== -1;
      const isCustomerMatch = filters.customer === "" || job.customer.toLowerCase().indexOf(filters.customer.toLowerCase()) !== -1;
      const isStartDateMatch = filters.startDate === "" || new Date(job.starttime) >= new Date(filters.startDate);
      const isEndDateMatch = filters.endDate === "" || new Date(job.endtime) <= new Date(filters.endDate);
      const isWoMatch = filters.woNumber === "" || job.wo_number.toString().indexOf(filters.woNumber) !== -1;
      const isPoMatch = filters.poNumber === "" || job.po_number.toString().indexOf(filters.poNumber) !== -1;
      const isPermitNumberMatch = filters.permitNumber === "" || job.permit_number.toString().indexOf(filters.permitNumber) !== -1;
      const isRequestIDMatch = filters.requestID === "" || job.request_id.toString().indexOf(filters.requestID) !== -1;
      return isIdMatch && isCustomerMatch && isStartDateMatch && isEndDateMatch && isWoMatch && isPoMatch && isPermitNumberMatch && isRequestIDMatch;
    });
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
        <h1>Invoice Page</h1>
        <div className="d-flex justify-content-center flex-wrap my-3">
          <FilterInput label="ID" value={filterSettings.id} onChange={(value) => handleFilterChange('id', value)} />
            
          <FilterInput label="WO#" value={filterSettings.woNumber} onChange={(value) => handleFilterChange('woNumber', value)} />
          <FilterInput label="Customer" value={filterSettings.customer} onChange={(value) => handleFilterChange('customer', value)} />
          <FilterInput label="Permit Number" value={filterSettings.permitNumber} onChange={(value) => handleFilterChange('permitNumber', value)} />
          <FilterInput label="PO number" value={filterSettings.poNumber} onChange={(value) => handleFilterChange('poNumber', value)} />
          <FilterInput label="Request ID" value={filterSettings.requestID} onChange={(value) => handleFilterChange('requestID', value)} />
        </div>
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item key={services.id} href={`#action/${services.id}`}>
                {services.name}
              </Dropdown.Item>
        </DropdownButton>
        <Table
            data={jobList}
            displayColumns={["ID", "StartTime", "EndTime", "Status", "Setup", "Customer", "Permit_number", "Notes", "WO_number", "PO_number", "Request_ID"]}
            handleUpdate={handleJobUpdate} handleDelete={handleJobDelete} 
          />
      </header>
    </div>
  );
}