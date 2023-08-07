import { useEffect, useState  } from "react";
import { getAllJobs } from "../Components/APICalls";
import Table from "../Components/Table";

export default function JobsTable(){
    const [jobList, setJobList] = useState([]);

    const fetchData = async () => {
        try {
          const data = await getAllJobs();
          setJobList(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

    return(
        <div className="my-4 container text-center">
            <h1>JobsTable</h1>
            <Table data = {jobList}></Table>
        </div>
    )
}