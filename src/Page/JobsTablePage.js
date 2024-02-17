import React, { useEffect, useState, useRef } from "react";
import { getUserById, getAllUsers, getAllJobs, deleteJob, updateJob } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import FilterInput from "../Components/FilterInput";
import Select from "react-select";
import { applySearchFilters, options } from "../Helpers/SearchUtils";

const moment = require('moment');

const columns = [
  { field: 'id', headerName: 'ID', flex: 1},
  { field: 'starttime', headerName: 'Start Time', flex: 1, minWidth: 160, 
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
    }, 
    type: 'dateTime', editable: true
  },
  { field: 'endtime', headerName: 'End Time', flex: 1, minWidth: 160,
    valueFormatter: (params) => {
      const date = moment(params.value).utcOffset('-07:00');
      return date.format('MM/DD/YYYY h:mm A'); // Format date as MM/DD/YYYY h:mm AM/PM
    }, 
    type: 'dateTime', editable: true
  },
  { field: 'status', headerName: 'Status', flex: 1, minWidth: 120, editable: true,  type: 'singleSelect',
  valueOptions: ['Market', 'Finance', 'Development'],},
  { field: 'company', headerName: 'Company', flex: 1, minWidth: 200},
  { field: 'setup', headerName: 'Setup', flex: 1, minWidth: 700},
  { field: 'wo_number', headerName: 'WO Number', flex: 1, minWidth:300},
]

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
      const filteredDataWithSearchFilters = applySearchFilters(sortedData, search, filters);

      setjobList(filteredDataWithSearchFilters);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableType, filters, search, jobList]);

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
            nColumns={columns}
            handleUpdate={handleJobUpdate}
            handleDelete={handleJobDelete}
          />
        </div>
      </div>
    </div>
  );
}
