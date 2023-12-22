import Table from "../Components/Table";
import { useEffect, useState  } from "react";
import { getAllJobs, deleteJob, updateJob} from "../Components/APICalls";

export default function CompletedPage() {
  const [taskList, settaskList] = useState([]);
  const [year, setYear] = useState([2016])

  async function fetchData() {
    try {
      const data = await getAllJobs();
      if (data == null) return;
      
      settaskList(data.filter(task => task.status === "Completed"));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleJobUpdate = async (id, params) => {
    await updateJob(id, params);
    fetchData()
  };

  const handletaskDelete = async id => {
    await deleteJob(id);
    fetchData()
  };

  const handleOnChange = (e) =>{
    var year = e.target.value;
    setYear(year)
  }


  useEffect(() => {fetchData()}, []);

  return (
      <div>
      <header className='container text-center my-4'>
        <h1>Completed Page</h1>
        {/* <label>Year: </label>
        <input type="number" min="1900" max="2100" step="1" value={year} className="mx-3" onChange={handleOnChange}/> */}
        <Table
            data={taskList}
            displayColumns={["ID", "StartTime", "EndTime", "Status", "Setup", "Customer", "Permit_number", "Notes", "WO_number", "PO_number"]}
            handleUpdate={handleJobUpdate} handletaskDelete={handletaskDelete} 
          />
      </header>
    </div>
  );
}