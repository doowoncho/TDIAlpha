import React, { useEffect, useState } from 'react';
import { getAllUsers, getAlltasks, gettaskByUserId } from '../Components/APICalls';
import { enCA } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import "../Helpers/Calendar.css";
import { CardContent, ListItemText } from '@mui/material';
import { Card } from 'react-bootstrap';
import { ScheduleComponent, Day, Week, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';

let users = await getAllUsers();

export default function ToDoPage() {
  const [events, setEvents] = useState([]);
  const [toggle, setToggle] = useState(true);
  const [isMobileScreen, setIsMobileScreen] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await gettasksForPage();
    }

    fetchData();

    // Set up resize event listener
    window.addEventListener('resize', handleResize);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [toggle]); // Run this effect whenever the toggle state changes

  useEffect(() => {
    // Initialize isMobileScreen on component mount
    setIsMobileScreen(window.innerWidth <= 768);
  }, []);

  const handleResize = () => {
    // Update isMobileScreen based on screen size when resized
    setIsMobileScreen(window.innerWidth <= 768);
  };

  async function gettasksForPage() {
    try {
      let tasks = toggle ? await gettaskByUserId(window.sessionStorage.getItem("user")) : await getAlltasks()
      let tempEvents = [];
      for (let task of tasks) {
        let event = {
          Subject:  task.type + ': ' + task?.setup,
          Id: task.id,
          StartTime: task.starttime ? new Date(task.starttime) : new Date(task.endtime),
          EndTime: task.endtime ? new Date(task.endtime) : new Date(task.starttime),
          CategoryColor: task.assigned ? users.find(user => user.id === task.assigned).color : ''
        };
        tempEvents.push(event);
      }
      setEvents(tempEvents);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  }

  const handleEventClick = ({event}) => {
    navigate(`/taskdetails/${event.Id}`);
  };

  const handleCellClick = (args) => {
    args.cancel = true; // Cancel the default behavior
}

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const eventSettings = { dataSource: events }
  function onEventRendered(args) {
    let categoryColor = args.data.CategoryColor;
    args.element.style.backgroundColor = categoryColor;
  }

  return (
    <div>

      <div className="form-check form-switch my-3 mx-5">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show All tasks</label>
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleToggle}/>
      </div>
      <div className='container'>
      <ScheduleComponent 
        height={'650px'} 
        eventSettings={eventSettings} 
        eventDoubleClick={(event) => handleEventClick(event)}
        eventClick={(event) => handleEventClick(event)}
        cellClick={(args) => handleCellClick(args)}
        cellDoubleClick={(args) => handleCellClick(args)}
        currentView={isMobileScreen ? 'Day' : 'Month'}
        eventRendered={onEventRendered.bind(this)}
        views={['Day', 'Week', 'Month', 'Agenda']}
      >
        <Inject services={[Day, Week, Month, Agenda]} />
      </ScheduleComponent>
      </div>
      <div className='container d-flex'>
        {users.map((x) => (
          <Card key={x.id}>
            <CardContent>
                <div style={{alignItems: 'center' }}>
                <ListItemText primary={`${x.name} `} />
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: x.color,
                      marginLeft: 10,
                      borderRadius: 100
                    }}
                  ></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
