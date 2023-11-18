import React, { useEffect, useState } from 'react';
import { getAllJobs, getJobByUserId } from '../Components/APICalls';
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
      await getJobsForPage();
    }

    fetchData();
  }, [toggle]); // Run this effect whenever the toggle state changes

  async function getJobsForPage() {
    try {
      let jobs = toggle ? await getJobByUserId(window.sessionStorage.getItem("user")) : await getAllJobs()
      let tempEvents = [];
      console.log(jobs)
      for (let job of jobs) {
        let event = {
          title: job.customer,
          id: job.id,
          start: new Date(job.starttime),
          end: new Date(job.endtime),
        };
        tempEvents.push(event);
      }
      setEvents(tempEvents);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  }

  const handleEventClick = (event) => {
    navigate(`/jobdetails/${event.id}`);
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div>
      <div className="form-check form-switch my-3 mx-5">
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Show All Jobs</label>
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
