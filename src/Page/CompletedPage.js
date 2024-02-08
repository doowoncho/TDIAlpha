import Table from "../Components/Table";
import { useEffect, useState  } from "react";
import { getAllJobs, deleteJob, updateJob} from "../Components/APICalls";
import FilterInput from "../Components/FilterInput";
import Select from "react-select";

const options = [
  { value: 'id', label: 'Id'},
  { value: 'contact', label: 'Contact'},
  { value: 'woNumber', label: 'WO Number'},
  { value: 'poNumber', label: 'PO Number'},
  { value: 'permitNumber', label: 'Permit Number'},
  { value: 'requestID', label: 'Request Id'},
  { value: 'setup', label: 'Setup'},
  { value: 'company', label: 'Company'}
];

function extraDay (date) {
  date.setDate(date.getDate() + 1)
  return date
}

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
      const filteredDataWithSearchFilters = applySearchFilters(sortedData);
      setJobList(filteredDataWithSearchFilters);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const applySearchFilters = (data) => {
    //get date ranges to work and it is perfect haha
    if(Object.values(filters).every(value => value === false)){
      return data
    }

    data = filters.startDate ? data.filter((job) => new Date(job.starttime) >= new Date(filters.startDate)) : data
    data = filters.endDate ? data.filter((job) => new Date(job.endtime) <= extraDay((new Date(filters.endDate)))) : data

    return data.filter((job) => {
      const isIdMatch = filters.id === true && job.id.toString().indexOf(search) !== -1;
      const isContactMatch = filters.contact === true && job.contact.toLowerCase().indexOf(search.toLowerCase()) !== -1;
      const isWoMatch = filters.woNumber === true && job.wo_number.toString().indexOf(search) !== -1;
      const isPoMatch = filters.poNumber === true && job.po_number.toString().indexOf(search) !== -1;
      const isPermitNumberMatch = filters.permitNumber === true && job.permit_number?.toString().indexOf(search) !== -1;
      const isRequestIDMatch = filters.requestID === true && job.request_id.toString().indexOf(search) !== -1;
      const isSetupMatch = filters.setup === true && job.setup.toString().indexOf(search) !== -1;
      const isCompanyMatch = filters.company === true && job.company.toString().indexOf(search) !== -1;
      return isIdMatch || isSetupMatch || isContactMatch || isWoMatch || isPoMatch || isPermitNumberMatch || isRequestIDMatch || isCompanyMatch;
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
  }, [filters, search]);

  return (
      <div>
      <header className='container text-center my-4'>
        <h1>Complete Jobs - To Be Invoiced</h1>
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
              on
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
        <Table
            data={jobList}
            displayColumns={["ID", "StartTime", "EndTime", "Status", "Setup", "Contact", "Permit_number", "Notes", "WO_number", "PO_number", "Request_ID", "Company"]}
            handleUpdate={handleJobUpdate} handleDelete={handleJobDelete} 
          />
      </header>
    </div>
  );
}