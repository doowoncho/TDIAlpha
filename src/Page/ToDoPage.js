import React, { useEffect, useState } from 'react';
import { getAllUsers, getAlltasks, getJobById, gettaskByUserId } from '../Components/APICalls';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { enCA } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../Helpers/Calendar.css";
import { CardContent, ListItem, ListItemText } from '@mui/material';
import { Card } from 'react-bootstrap';

let users = await getAllUsers();

const locales = {
  "en-CA": enCA
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

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
          title: task.assigned ? users.find(user => user.id === task.assigned).name + ': ' + task.type : 'Unassigned: ' + task.type,
          id: task.id,
          start: task.starttime ? new Date(task.starttime) : new Date(task.endtime),
          end: task.endtime ? new Date(task.endtime) : new Date(task.starttime),
          color: task.assigned ? users.find(user => user.id === task.assigned).color : ''
        };
        tempEvents.push(event);
      }
      setEvents(tempEvents);
    } catch (error) {
      console.error("Error fetching task data:", error);
    }
  }

  const handleEventClick = (event) => {
    navigate(`/taskdetails/${event.id}`);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color;
    return {
      style: {
        backgroundColor,
      },
    };
  };

  return (
    <div>
      <div className="form-check form-switch my-3 mx-5">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show All tasks</label>
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleToggle}/>
      </div>
      <div>
        <Calendar
          defaultView={isMobileScreen ? 'week' : 'month'}
          tooltipAccessor="start"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: '600px', ...(isMobileScreen ? {} : { marginLeft: '80px', marginRight: '80px' }) }}
          onSelectEvent={(event) => handleEventClick(event)}
          views={['month', 'day', 'week']}
          eventPropGetter={eventStyleGetter}
        />
      </div>
      <div className='container d-flex'>
        {users.map((x) => (
          <Card key={x.id}>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                <ListItemText primary={`${x.name} `} />
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: x.color,
                      marginLeft: 10
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
