import React, { useEffect, useState } from 'react';
import { getAlltasks, gettaskByUserId } from '../Components/APICalls';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { enCA } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';
import "react-big-calendar/lib/css/react-big-calendar.css";

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
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await gettasksForPage();
    }

    fetchData();
  }, [toggle]); // Run this effect whenever the toggle state changes

  async function gettasksForPage() {
    try {
      let tasks = toggle ? await gettaskByUserId(window.sessionStorage.getItem("user")) : await getAlltasks()
      let tempEvents = [];
      console.log(tasks)
      for (let task of tasks) {
        let event = {
          title: task.customer,
          id: task.id,
          start: task.starttime ? new Date(task.starttime) : new Date(task.endtime),
          end: task.endtime ? new Date(task.endtime) : new Date(task.starttime),
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

  return (
    <div>
      <div className="form-check form-switch my-3 mx-5">
        <label className="form-check-label" for="flexSwitchCheckDefault">Show All tasks</label>
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onChange={handleToggle}/>
      </div>
      <Calendar
        min={new Date(0, 0, 0, 6, 0, 0)}
        max={new Date(0, 0, 0, 23, 0, 0)}
        tooltipAccessor={"start"}
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        onSelectEvent={(event) => handleEventClick(event)}
      >
      </Calendar>
    </div>
  );
}
