import React, { useEffect, useState, useRef } from "react";
import { getUserById, getAllUsers, getAllJobs, deleteJob, updateJob } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import FilterInput from "../Components/FilterInput";
 
let user = await getUserById(window.sessionStorage.getItem("user"))

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
  const [counts, setCounts] = useState({ New: 0, Declined: 0, Submitted: 0 });
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

  // Entire list of jobs
  const originalDataRef = useRef(null);

  const fetchData = async () => {
    try {
      const data = await getAllJobs();
      // Different counts for the jobs filters
      const newCount = data.filter((job) => job.status === "New" || job.status === 'Waiting').length;
      const declinedCount = data.filter((job) => job.status === "Declined").length;
      const submittedCount = data.filter((job) => job.status === "Submitted").length;

      setCounts({ New: newCount, Declined: declinedCount, Submitted: submittedCount });

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
      const filteredDataWithSearchFilters = applySearchFilters(sortedData, filterSettings);

      setjobList(filteredDataWithSearchFilters);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [tableType, filterSettings]);

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
            <TableCards header="Declined jobs" num={counts.Declined} icon="bi bi-exclamation-lg" color="text-danger" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("Submitted")} style={{ textDecoration: "none" }}>
            <TableCards header="Submitted" num={counts.Submitted} icon="bi bi-check-lg" color="text-success" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("All")} style={{ textDecoration: "none" }}>
            <TableCards header="All jobs" num={counts.New + counts.Declined + counts.Submitted} icon="bi bi-list" color="text-info" />
          </button>
        </div>
      </div>
      <div className="my-4 container text-center">
        <h1>{tableType}</h1>
        <div className="d-flex justify-content-center flex-wrap my-3">

            <FilterInput label="ID" value={filterSettings.id} onChange={(value) => handleFilterChange('id', value)} />
            <FilterInput label="WO#" value={filterSettings.woNumber} onChange={(value) => handleFilterChange('woNumber', value)} />
            <FilterInput label="Customer" value={filterSettings.customer} onChange={(value) => handleFilterChange('customer', value)} />
            <FilterInput label="Permit Number" value={filterSettings.permitNumber} onChange={(value) => handleFilterChange('permitNumber', value)} />
            <FilterInput label="PO number" value={filterSettings.poNumber} onChange={(value) => handleFilterChange('poNumber', value)} />

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
              "ID", "StartTime", "EndTime", "Status", "Customer", "WO_Number"
            ]}
            handleUpdate={handleJobUpdate}
            handleDelete={handleJobDelete}
          />
        </div>
      </div>
    </div>
  );
}
