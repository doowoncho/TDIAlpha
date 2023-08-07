import { useEffect, useState  } from "react";
import { getSpecificJobs } from "../Components/APICalls";
import Table from "../Components/Table";

export default function DeclinedTable(){
    const [dataList, setDataList] = useState([]);

    const fetchData = async () => {
        try {
          const searchParameters = {
            status: 'Declined'
          }
          const data = await getSpecificJobs(searchParameters);
          setDataList(data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    useEffect(() => {
        fetchData();
      }, []);

    return(
        <div className="container text-center">
            <h1>New Requests</h1>
            <Table data = {dataList}></Table>
        </div>
    )
}