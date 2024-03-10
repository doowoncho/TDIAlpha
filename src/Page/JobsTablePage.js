import React, { useEffect, useState, useRef } from "react";
import { getUserById, getAllUsers, getAllJobs, deleteJob, updateJob } from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";
import { applySearchFilters, options } from "../Helpers/SearchUtils";
import { JobsTableColumns } from "../Helpers/TableUtils";
import { BadgeOutlined, CheckCircleOutline, Error, ErrorOutline, Mail, MailLock, MailOutline, NotificationAdd, Notifications, NotificationsOutlined, ReportProblem } from "@mui/icons-material";
import { Badge } from "@mui/material";

const TableCards = ({ bg, header, icon, color, num }) => (
  <div className={`card mx-2 mt-2 p-2 rounded d-none d-sm-block`} style={{background: `${bg}`, border:"none"}}>
    <div className={`card-body ${window.innerWidth < 768 ? 'p-0 text-center' : 'p-2'}`}>
      <div className="media d-sm-flex">
        <div className={`align-self-center d-none d-sm-flex`}>
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
{/* <a href={`/taskdetails/${params.value}`} className="no-link-style">{params.value}</a>  */}
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
  }, [tableType]);

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

  return (
    <div>
        <div className="container d-flex justify-content-center my-2 flex-wrap">
          <button className="btn btn-link" onClick={() => handleTableTypeChange("New")} color="text-primary" style={{ textDecoration: "none" }}>
            <Badge badgeContent={counts.New} color="primary" className="className='d-block d-sm-none mx-4 my-3">
              <NotificationsOutlined color="action" />
            </Badge>
            <TableCards header="New" num={counts.New} icon="bi bi-bell-fill" bg="#A1DCF3"/>
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("Declined")} style={{ textDecoration: "none" }}>
            <Badge badgeContent={counts.Declined} color="success" className="className='d-block d-sm-none mx-4 my-3">
              <ErrorOutline color="action" />
            </Badge>
            <TableCards header="Declined" num={counts.Declined} icon="bi bi-exclamation-lg" color="text-dark" bg="#FF8A8A"/>
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("Submitted")} style={{ textDecoration: "none" }}>
            <Badge badgeContent={counts.Submitted} color="secondary" className="className='d-block d-sm-none mx-4 my-3">
              <CheckCircleOutline color="action" />
            </Badge>
            <TableCards header="Submitted" num={counts.Submitted} icon="bi bi-check-lg" color="text-success" bg="#C6E1BA" />
          </button>
          <button className="btn btn-link" onClick={() => handleTableTypeChange("All")} style={{ textDecoration: "none" }}>
            <Badge badgeContent={counts.New + counts.Declined + counts.Submitted + counts.Approved} color="secondary" className="className='d-block d-sm-none mx-4 my-3">
              <MailOutline color="action" />
            </Badge>
            <TableCards header="All Jobs" num={counts.New + counts.Declined + counts.Submitted + counts.Approved} icon="bi bi-list" bg="#F2EFEA" />
          </button>
      </div>
      <div className="container">
        <div className="d-flex justify-content-center flex-wrap">  
        </div>
        <div>
          <h2 className="text-center">{tableType}</h2>
          <Table data={jobList}
            columns = {JobsTableColumns}
            handleUpdate={handleJobUpdate}
            handleDelete={handleJobDelete}
            />
        </div>
      </div>
    </div>
  );
}
