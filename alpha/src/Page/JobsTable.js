import { useEffect, useState  } from "react";
import { getAllJobs, getSpecificJobs} from "../Components/APICalls";
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

export default function JobsTable(){
    const [tableType, setTableType] = useState([])
    const [jobList, setJobList] = useState([])
    const [requestCount, setRequestCount] = useState([])
    const [declinedCount, setDeclinedtCount] = useState([])
    const [completedCount, setCompletedCount] = useState([])

    const TableRender = () => {
      var columns = ["id", "startDate", "status", "setup", "customer", "permit_number", "notes", "wo_number", "po_number"]
      // if(tableType == 'New'){
      //   columns = ["id", "startDate", "status", "setup", "customer"]
      // }
      return (<Table data={jobList} CallBack={()=>fetchData({status: tableType})} displayColumns={columns}/>)
    }

    async function ReRenderCounts(){
      const data = await getAllJobs()
      if(data==null){return}
      setRequestCount(data.filter(job => job.status === "New").length)
      setDeclinedtCount(data.filter(job => job.status === "Declined").length)
      setCompletedCount(data.filter(job => job.status === "Completed").length)
    }

    const fetchData = async (table) => {
        try {
          ReRenderCounts()
          setJobList(await getSpecificJobs(table));

          if(table == null){
            setTableType("All")
          }
          else{
            setTableType(table.status)
          }

        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

    useEffect(() => {
      fetchData();
      // eslint-disable-next-line
      }, []);

      return (
        <div>
          <div className='border border-1 bg-light'>
            <div className="container d-flex justify-content-center my-3">
              <button style={{border: "none", background: "none"}} onClick={() => fetchData({status: 'New'})}>
                <TableCards header="New Requests" num={requestCount} icon="bi bi-bell-fill" color="text-primary"/>
              </button>
              <button style={{border: "none", background: "none"}} onClick={() => fetchData({status: 'Declined'})}>
                <TableCards header="Declined Jobs" num={declinedCount} icon="bi bi-exclamation-lg" color="text-danger"/>
              </button>
              <button style={{border: "none", background: "none"}} onClick={() => fetchData({status: 'Completed'})}>
                <TableCards header="Completed" num={completedCount} icon="bi bi-check-lg" color="text-success"/>
              </button>
            </div>
          </div>
          <div className="my-4 container text-center">
            <h1>{tableType}</h1>
              <div>
                {TableRender()}
              </div>
          </div>
        </div>
      )
}