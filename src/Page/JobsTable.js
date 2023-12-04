import React, { useEffect, useState, useRef } from "react";
import { getAllJobs, updateJob, deleteJob, getUserById, getAllUsers } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import { Dropdown } from 'react-bootstrap';
 
let user = await getUserById(window.sessionStorage.getItem("user"))
let users = await getAllUsers()

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

const FilterInput = ({ label, value, onChange }) => (
  <div className="mx-2">
    <label className="form-label">{label}</label>
    <input
      type="text"
      className="form-control"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);

export default function JobsTable() {
  const [tableType, setTableType] = useState("All");
  const [jobList, setJobList] = useState([]);
  const [counts, setCounts] = useState({ New: 0, Declined: 0, Completed: 0 });
  const [filterSettings, setFilterSettings] = useState({
    id: "",
    assigned: "",
    customer: "",
    startDate: "",
    endDate: ""
  });

  //entire list of jobs
  const originalDataRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //just gets the list once per load
        // if (!originalDataRef.current) {
        //   const data = await getAllJobs();
        //   if (data == null) return;

        //   originalDataRef.current = data;
        // }

        // const data = originalDataRef.current;


        const data = await getAllJobs();

        //different counts for the jobs filters
        const newCount = data.filter((job) => job.status === "New").length;
        const declinedCount = data.filter((job) => job.status === "Declined").length;
        const completedCount = data.filter((job) => job.status === "Completed").length;

        setCounts({ New: newCount, Declined: declinedCount, Completed: completedCount });

        //jobs filtered by table
        const filteredData = tableType !== "All" ? data.filter((job) => job.status === tableType) : data.filter((job) => job.status !== "Invoice");
        
        //sort by newest
        const sortedData = filteredData.sort((jobA, jobB) => {
          const timeA = jobA.endtime ? new Date(jobA.endtime) : new Date(jobA.starttime);
          const timeB = jobB.endtime ? new Date(jobB.endtime) : new Date(jobB.starttime);
        
          return timeA - timeB;
        });
        // jobs filtered by search
        const filteredDataWithSearchFilters = sortedData.filter((job) => {
          const isIdMatch = filterSettings.id === "" || job.id.toString().indexOf(filterSettings.id) !== -1;
          // const isAssignedMatch = filterSettings.assigned === "" || job.assigned.toString().toLowerCase == filterSettings.assigned;
          const isCustomerMatch = filterSettings.customer === "" || job.customer.toLowerCase().indexOf(filterSettings.customer.toLowerCase()) !== -1;
          const isStartDateMatch = filterSettings.startDate === "" || new Date(job.starttime) >= new Date(filterSettings.startDate);
          const isEndDateMatch = filterSettings.endDate === "" || new Date(job.endtime) <= new Date(filterSettings.endDate);
          return isIdMatch 
          // && isAssignedMatch 
          && isCustomerMatch && isStartDateMatch && isEndDateMatch;
        });

        setJobList(filteredDataWithSearchFilters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [tableType, filterSettings, jobList]);

  const handleTableTypeChange = (newTableType) => {
    if (tableType !== newTableType) {
      setTableType(newTableType);
    }
  };

  const handleJobUpdate = async (id, params) => {
    await updateJob(id, params);
    // No need to refetch data, just update the local state
    setJobList((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, ...params } : job))
    );
  };

  const handleJobDelete = async (id) => {
    await deleteJob(id);
    // No need to refetch data, just update the local state
    setJobList((prevJobs) => prevJobs.filter((job) => job.id !== id));
  };

  const handleFilterChange = (param, value) => {
    setFilterSettings((prevSettings) => ({
      ...prevSettings,
      [param]: value
    }));
  };

  return (
    <div>
      <div className='border border-1 bg-light'>
        <div className="container d-flex justify-content-center my-3 flex-wrap">
          <button className="btn btn-link" onClick={() => handleTableTypeChange("New")} style={{ textDecoration: "none" }}>
            <TableCards header="New Requests" num={counts.New} icon="bi bi-bell-fill" color="text-primary" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("Declined")} style={{ textDecoration: "none" }}>
            <TableCards header="Declined Jobs" num={counts.Declined} icon="bi bi-exclamation-lg" color="text-danger" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("Completed")} style={{ textDecoration: "none" }}>
            <TableCards header="Completed" num={counts.Completed} icon="bi bi-check-lg" color="text-success" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("All")} style={{ textDecoration: "none" }}>
            <TableCards header="All Jobs" num={counts.New + counts.Declined + counts.Completed} icon="bi bi-list" color="text-info" />
          </button>
        </div>
      </div>
      <div className="my-4 container text-center">
        <h1>{tableType}</h1>
        <div className="d-flex justify-content-center flex-wrap my-3">

            <FilterInput label="ID" value={filterSettings.id} onChange={(value) => handleFilterChange('id', value)} />
            {/* <FilterInput label="Assigned" value={filterSettings.assigned} onChange={(value) => handleFilterChange('assigned', value)} /> */}
            <FilterInput label="Customer" value={filterSettings.customer} onChange={(value) => handleFilterChange('customer', value)} />

            <div className="mx-2">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={filterSettings.startDate} onChange={(e) => handleFilterChange('startDate', e.target.value)} />
            </div>

            <div className="mx-2">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className="form-control"
                value={filterSettings.startDate} onChange={(e) => handleFilterChange('endDate', e.target.value)} />
            </div> 
        </div>
        <div>
          <Table data={jobList}
            displayColumns={[
              "ID", "StartTime", "EndTime", "Status", "Setup", "Customer",
              "Permit_number", "WO_number", "NPAT", "Assigned"
            ]}
            handleJobUpdate={handleJobUpdate}
            handleJobDelete={handleJobDelete}
          />
        </div>
      </div>
    </div>
  );
}
