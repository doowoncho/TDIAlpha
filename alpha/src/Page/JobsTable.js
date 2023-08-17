import { useEffect, useState  } from "react";
import { getAllJobs, getSpecificJobs, updateJob, deleteJob} from "../Components/APICalls";
import "bootstrap-icons/font/bootstrap-icons.css";
import Table from "../Components/Table";

const TableCards = ({bg, header, icon, color, num}) =>
{
    return(
        <div className={`card ${bg} mx-2 border p-2 bg-white rounded`}>
          <div className="card-content">
            <div className="card-body">
              <div className="media d-flex">
                <div className="align-self-center">
                  <i className={`${icon} mx-3 ${color}`} style={{ fontSize: "2rem" }}></i>
                </div>
                <div className='mx-3'></div>
                  <div>
                    <h3 className={`text-center ${color}`}>{num}</h3>
                    <span className={color}>{header}</span>
                  </div>
              </div>
            </div>
          </div>
        </div>
        )
}

export default function JobsTable() {
  const [tableType, setTableType] = useState("All");
  const [jobList, setJobList] = useState([]);
  const [counts, setCounts] = useState({New: 0, Declined: 0, Completed: 0});


  async function fetchData() {
    try {
      const data = await getAllJobs();
      if (data == null) return;
      
      const newCount = data.filter(job => job.status === "New").length;
      const declinedCount = data.filter(job => job.status === "Declined").length;
      const completedCount = data.filter(job => job.status === "Completed").length;
      
      setCounts({New: newCount, Declined: declinedCount, Completed: completedCount});

      tableType !== "All" ? setJobList(data.filter(job => job.status === tableType)) : setJobList(data);

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {fetchData()}, [tableType]);

  const handleTableTypeChange = newTableType => {
    if (tableType !== newTableType) {
      setTableType(newTableType);
    }
  };

  const handleJobUpdate = async (id, params) => {
    await updateJob(id, params);
    fetchData()
  };

  const handleJobDelete = async id => {
    await deleteJob(id);
    fetchData()
  };

  // const updateAssignedUser = async (id) =>{
  //   await updateAssignedUser(id)
  //   fetchData()
  // }

  const renderButtons = () => {
    return (
      <div className="container d-flex justify-content-center my-3">
        <button className="btn btn-link" onClick={() => handleTableTypeChange("New")}>
          <TableCards header="New Requests" num={counts.New} icon="bi bi-bell-fill" color="text-primary" />
        </button>
        <button className="btn btn-link" onClick={() => handleTableTypeChange("Declined")}>
          <TableCards header="Declined Jobs" num={counts.Declined} icon="bi bi-exclamation-lg" color="text-danger" />
        </button>
        <button className="btn btn-link" onClick={() => handleTableTypeChange("Completed")}>
          <TableCards header="Completed" num={counts.Completed} icon="bi bi-check-lg" color="text-success" />
        </button>
        <button className="btn btn-link" onClick={() => handleTableTypeChange("All")}>
          <TableCards header="All Jobs" num={counts.New + counts.Declined + counts.Completed} icon="bi bi-list" color="text-info" />
        </button>
      </div>
    );
  };

  return (
    <div>
      <div className='border border-1 bg-light'>
        {renderButtons()}
      </div>
      <div className="my-4 container text-center">
        <h1>{tableType}</h1>
        <div>
        <Table
            data={jobList}
            displayColumns={["ID", "StartDate", "EndDate", "Status", "Setup", "Customer", "Permit_number", "Notes", "WO_number", "PO_number", "Assigned"]}
            handleJobUpdate={handleJobUpdate} handleJobDelete={handleJobDelete} 
          />
        </div>
      </div>
    </div>
  )
}