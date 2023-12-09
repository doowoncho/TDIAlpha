import Table from "../Components/Table";
import { useEffect, useState  } from "react";
import { getAlltasks, updatetask, deletetask} from "../Components/APICalls";

export default function CompletedPage() {
  const [taskList, settaskList] = useState([]);

  async function fetchData() {
    try {
      const data = await getAlltasks();
      if (data == null) return;
      
      settaskList(data.filter(task => task.status === "Completed"));

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handletaskUpdate = async (id, params) => {
    await updatetask(id, params);
    fetchData()
  };

  const handletaskDelete = async id => {
    await deletetask(id);
    fetchData()
  };


  useEffect(() => {fetchData()});

  return (
      <div>
      <header className='container text-center my-4'>
        <h1>Completted Page</h1>
        <Table
            data={taskList}
            displayColumns={["ID", "StartTime", "EndTime", "Status", "Setup", "Customer", "Permit_number", "Notes", "WO_number", "PO_number"]}
            handletaskUpdate={handletaskUpdate} handletaskDelete={handletaskDelete} 
          />
      </header>
    </div>
  );
}