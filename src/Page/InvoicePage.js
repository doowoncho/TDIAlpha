import Table from "../Components/Table";
import { useEffect, useState  } from "react";
import { getAllJobs, deleteJob, updateJob} from "../Components/APICalls";
import FilterInput from "../Components/FilterInput";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Select from "react-select";
import { applySearchFilters, options } from "../Helpers/SearchUtils";

export default function InvoicePage() {
  const [jobList, setJobList] = useState([]);
  const [services, setServices] = useState([]);
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

      const filteredData = data.filter(job => job.status == 'Invoice')

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

  const handleSearchChange = (value) => {
    setSearch(value)
  };

  const handleDateChange = (event, param) => {
    const { value } = event.target;
    setFilters({...filters,
      [param]: value
    });
  };

  const handleFilterChange = (selectedOptions) => {
    const updatedSettings = { 
      id: false,
      assigned: false,
      contact: false,
      woNumber: false,
      poNumber: false,
      permitNumber: false,
      requestID: false,
      setup: false,
      company: false
    };

    for(let i = 0; i<selectedOptions.length; i++){
      updatedSettings[selectedOptions[i].value] = true
    }

    setFilters(updatedSettings);
  }

  useEffect(() => {
    fetchData();
  }, [filters, search, jobList]);


  return (
      <div>
      <header className='container text-center my-4'>
        <h1>Invoice Page</h1>
        <div className="d-flex justify-content-center flex-wrap my-3">
        <div>
          <label className="form-label">Filters</label>
            <Select
              defaultValue={[options[6]]}
              isMulti
              name="colors"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleFilterChange}
            />
        </div>
          
            <FilterInput label="Search" value={search} onChange={(value) => handleSearchChange(value)} />

            <div className="mx-2">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => handleDateChange(e,'startDate')}
                />
            </div>

            <div className="mx-2">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                onChange={(e) => handleDateChange(e,'endDate')}
                />
            </div> 
        </div>
        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
        <Dropdown.Item key={services.id} href={`#action/${services.id}`}>
                {services.name}
              </Dropdown.Item>
        </DropdownButton>
        <Table
            data={jobList}
            displayColumns={["ID", "StartTime", "EndTime", "Status", "Setup", "Contact", "Permit_number", "Notes", "WO_number", "PO_number", "Request_ID", "Company"]}
            handleUpdate={handleJobUpdate} handleDelete={handleJobDelete} 
          />
      </header>
    </div>
  );
}