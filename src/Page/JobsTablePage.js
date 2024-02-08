import React, { useEffect, useState, useRef } from "react";
import { getUserById, getAllUsers, getAllJobs, deleteJob, updateJob } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
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

const TableCards = ({ bg, header, icon, color, num }) => (
  <div className={`card ${bg} mx-2 border p-2 bg-white rounded`}>
    <div className={`card-body ${window.innerWidth < 768 ? 'p-0 text-center' : 'p-2'}`}>
      <div className="media d-flex">
        <div className={`align-self-center ${window.innerWidth < 768 ? 'd-none' : ''}`}>
          <i className={`${icon} mx-3 ${color} text-xxl`} style={{ fontSize: "2rem" }}></i>
        </div>
        <div className='mx-3'></div>
        <div>
          <h3 className={`text-xxl ${color} ${window.innerWidth < 768 ? 'd-none' : ''}`}>{num}</h3>
          <span className={`text-xxl ${color}`}>{header}</span>
        </div>
      </div>
    </div>
  </div>
);

function extraDay (date) {
  date.setDate(date.getDate() + 1)
  return date
}

export default function JobsTable() {
  const [tableType, setTableType] = useState("All");
  const [jobList, setjobList] = useState([]);
  const [search, setSearch] = useState([]);
  const [counts, setCounts] = useState({ New: 0, Declined: 0, Submitted: 0, Approved: 0 });
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

  // Entire list of jobs
  const originalDataRef = useRef(null);

  const fetchData = async () => {
    try {
      const data = await getAllJobs();
      // Different counts for the jobs filters
      const newCount = data.filter((job) => job.status === "New" || job.status === 'Waiting').length;
      const declinedCount = data.filter((job) => job.status === "Declined").length;
      const submittedCount = data.filter((job) => job.status === "Submitted").length;
      const approvedCount = data.filter((job) => job.status === "Approved").length;

      setCounts({ New: newCount, Declined: declinedCount, Submitted: submittedCount, Approved: approvedCount });

      // Jobs filtered by table unless it is a waiting job, in which case it is shown with the new requests
      let filteredData;
      if (tableType === 'New') {
        filteredData = data.filter((job) => job.status === tableType || job.status === 'Waiting');
      } else {
        filteredData = tableType !== "All"
          ? data.filter((job) => job.status === tableType)
          : data.filter((job) => job.status !== "Invoice" && job.status !== 'Completed');
      }

      // Sort by newest
      const sortedData = filteredData.sort((jobA, jobB) => {
        const timeA = jobA.endtime ? new Date(jobA.endtime) : new Date(jobA.starttime);
        const timeB = jobB.endtime ? new Date(jobB.endtime) : new Date(jobB.starttime);

        return timeA - timeB;
      });

      // Jobs filtered by search
      const filteredDataWithSearchFilters = applySearchFilters(sortedData);

      setjobList(filteredDataWithSearchFilters);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableType, filters, search]);

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

  const handleTableTypeChange = (newTableType) => {
    if (tableType !== newTableType) {
      setTableType(newTableType);
    }
  };
  
  const handleJobUpdate = async (id, params) => {
    await updateJob(id, params);
    fetchData()
  };
  
  const handleJobDelete = async (id) => {
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

  return (
    <div>
      <div className='border border-1 bg-light'>
        <div className="container d-flex justify-content-center my-3 flex-wrap">
          <button className="btn btn-link" onClick={() => handleTableTypeChange("New")} style={{ textDecoration: "none" }}>
            <TableCards header="New Requests" num={counts.New} icon="bi bi-bell-fill" color="text-primary" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("Declined")} style={{ textDecoration: "none" }}>
            <TableCards header="Declined jobs" num={counts.Declined} icon="bi bi-exclamation-lg" color="text-danger" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("Submitted")} style={{ textDecoration: "none" }}>
            <TableCards header="Submitted" num={counts.Submitted} icon="bi bi-check-lg" color="text-success" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("All")} style={{ textDecoration: "none" }}>
            <TableCards header="All jobs" num={counts.New + counts.Declined + counts.Submitted + counts.Approved} icon="bi bi-list" color="text-info" />
          </button>
        </div>
      </div>
      <div className="my-4 container text-center">
        <h1>{tableType}</h1>
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
        <div>
          <Table data={jobList}
            displayColumns={[
              "ID", "StartTime", "EndTime", "Status", "Company", "Setup", "WO_Number"
            ]}
            handleUpdate={handleJobUpdate}
            handleDelete={handleJobDelete}
          />
        </div>
      </div>
    </div>
  );
}
